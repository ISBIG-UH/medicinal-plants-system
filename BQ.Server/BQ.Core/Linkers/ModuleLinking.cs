using System.Reflection;
using BQ.Core.Data.Enum;
using BQ.Core.Exceptions;

namespace BQ.Core.Linkers;

/// <summary>
/// Provides utilities to link all assemblies in the solution during the application initialization.
/// </summary>
public class ModuleLinking
{
    private const string AssemblyPrefix = "BQ.";
    
    /// <summary>
    /// Associate each assembly to its order in the topological sort of the assemblies.
    /// This is used to avoid recomputing the sort every time the assemblies are needed while not having the assemblies list in memory.
    /// </summary>
    private static Dictionary<string, int> _assembliesTopologicalOrder = new Dictionary<string, int>(); 
    
    private static bool AssembliesLoaded => _assembliesTopologicalOrder.Count > 0;

    /// <summary>
    /// Collects all the modules of the solution using reflection and converts them into objects.
    /// </summary>
    /// <returns>An iterable of <c>Assembly</c> objects that map to the solution modules.</returns>
    private static IEnumerable<Assembly> GetAssemblies() => AppDomain.CurrentDomain.GetAssemblies()
        .Where(a => a.FullName != null && a.FullName.StartsWith(AssemblyPrefix));

    /// <summary>
    /// Loads all assemblies into the application domain and computes their topological order (see https://en.wikipedia.org/wiki/Topological_sorting) by running
    /// a DFS over the assemblies graph, being this method the entry point to the DFS algorithm.
    /// Calling this method will modify <c>_assembliesTopologicalOrder</c>
    /// </summary>
    private static void LoadAssemblies()
    {
        var domainAssemblies =  AppDomain.CurrentDomain.GetAssemblies()
            .Where(a => a.FullName != null && a.FullName.StartsWith(AssemblyPrefix));

        var assemblyStates = new Dictionary<string, AssemblyState>();
        foreach (var assembly in domainAssemblies)
            if (!assemblyStates.ContainsKey(assembly.FullName!))
                LoadAssemblyDependencies(assembly, assemblyStates);
    }

    /// <summary>
    /// Processing method for child nodes in the DFS algorithm to load the assemblies in topological order.
    /// </summary>
    /// <param name="assembly">The assembly to start the DFS from.</param>
    /// <param name="assemblyStates">Associates each assembly with its processing state.</param>
    /// <exception cref="LinkingException">Raised if a cyclic dependency is detected.</exception>
    private static void LoadAssemblyDependencies(Assembly assembly, Dictionary<string, AssemblyState> assemblyStates)
    {
        assemblyStates.Add(assembly.FullName!, AssemblyState.Processing);

        var dependenciesNames = assembly.GetReferencedAssemblies()
            .Where(x => x.FullName.StartsWith(AssemblyPrefix));

        foreach (var dependencyName in dependenciesNames)
        {
            var hasDependencyState = assemblyStates.TryGetValue(dependencyName.FullName, out var dependencyState);
            
            if (!hasDependencyState)
            {
                var dependency =  Assembly.Load(dependencyName);
                LoadAssemblyDependencies(dependency, assemblyStates);
            } 
            else if (dependencyState == AssemblyState.Processing)
            {
                throw new LinkingException("Cyclic dependency found in assemblies");
            } 
                
        }

        assemblyStates[assembly.FullName!] = AssemblyState.Processed;
        _assembliesTopologicalOrder.Add(assembly.FullName!, _assembliesTopologicalOrder.Count);
        
    }

    /// <summary>
    /// Returns the linkers of all assemblies in the solution cast to the specific Linker interface.
    /// </summary>
    /// <typeparam name="TLinker">A derived interface of <see cref="T:WT.Core.Linking.IBaseLinker"></see>.</typeparam>
    /// <returns>An iterable of all TLinker objects found in the solution's assemblies.</returns>
    public static IEnumerable<TLinker> GetLinkersFromAssemblies<TLinker>() where TLinker : IModuleLinker
    {
        // Ensure all modules are loaded in topological order before instantiating the linkers to avoid missing dependencies
        if (!AssembliesLoaded)
            LoadAssemblies();
        
        Type linkerType = typeof(TLinker);

        IEnumerable<Assembly> assemblies = GetAssemblies().OrderBy(a => _assembliesTopologicalOrder[a.FullName!]);

        foreach (var assembly in assemblies)
        {
            // Get all types in the assembly that conform to the TLinker class
            IEnumerable<Type> linkerClasses =
                assembly.GetTypes().Where(t => t.IsClass && linkerType.IsAssignableFrom(t));

            foreach (var linkerClass in linkerClasses)
            {
                var linkerInstance = (TLinker)assembly.CreateInstance(linkerClass.FullName);
                
                if (linkerInstance != null)
                    yield return linkerInstance;
            }
        }
        
    }
    
    
}
namespace BQ.Authorization.Routing;

public class RouteDTO
{
    public RouteDTO(string path, string title, IEnumerable<string> roles)
        => (Path, Title, Roles) = (path, title, new List<string>(roles));

    public RouteDTO(string path, string title, string role)
        : this(path, title, new List<string> { role }) { }

    public RouteDTO(string path, string title)
        : this(path, title, new List<string>()) { }
    
    public string Path { get; set; }
    public string Title { get; set; }
    public List<string> Roles { get; set; }

    public RouteDTO ForRoles(IEnumerable<string> roles)
    {
        Roles.AddRange(roles);
        return this;
    }

    public RouteDTO ForRole(string role) => ForRoles(new List<string> { role });
}
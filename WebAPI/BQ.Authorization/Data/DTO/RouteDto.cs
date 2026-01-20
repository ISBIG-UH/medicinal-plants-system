namespace BQ.Authorization.Data.DTO;

public class RouteDto
{
    public RouteDto(string path, string title, IEnumerable<string> roles)
        => (Path, Title, Roles) = (path, title, new List<string>(roles));

    public RouteDto(string path, string title, string role)
        : this(path, title, new List<string> { role }) { }

    public RouteDto(string path, string title)
        : this(path, title, new List<string>()) { }
    
    public string Path { get; set; }
    public string Title { get; set; }
    public List<string> Roles { get; set; }

    public RouteDto ForRoles(IEnumerable<string> roles)
    {
        Roles.AddRange(roles);
        return this;
    }

    public RouteDto ForRole(string role) => ForRoles(new List<string> { role });
}
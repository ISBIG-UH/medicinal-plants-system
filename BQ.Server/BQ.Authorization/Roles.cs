namespace CQ.Core;


public static class Roles
{
    public const string SystemAdminRole = "SystemAdmin";
    
    public const string DataCuratorRole = "DataCurator";

    public static readonly List<string> AllRoles = new List<string>() {SystemAdminRole, DataCuratorRole };
}

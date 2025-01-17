using Microsoft.EntityFrameworkCore;

public static class PostgresFunctions
{
    [DbFunction("similarity", Schema = "pg_catalog")]
    public static double Similarity(string text1, string text2)
    {
        throw new NotImplementedException("This method is for use with Entity Framework Core LINQ queries only.");
    }

    [DbFunction("unaccent", Schema = "public")]
    public static string Unaccent(string text)
    {
        throw new NotImplementedException();
    }
}

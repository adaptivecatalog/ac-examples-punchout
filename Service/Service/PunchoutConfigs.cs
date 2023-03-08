namespace Service;

public class PunchoutConfigs
{
    public required string ServiceBaseUrl { get; set; }
    public required string WebBaseUrl { get; set; }

    public required string Organization { get; set; }
    public required string ApiKey { get; set; }
    public required string AdaptiveCatalogBaseUrl { get; set; }
    public required string Username { get; set; }
}
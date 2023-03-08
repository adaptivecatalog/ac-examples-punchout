namespace Service.Models;

public class PunchoutSetupRequest
{
    public string? Company { get; set; }
    public string? Username { get; set; }
    public string? ApiKey { get; set; }
    public string? CallbackUrl { get; set; }
}

public class PunchoutSetupResponse
{
    public string? Id { get; set; }
    public string? Url { get; set; }
}
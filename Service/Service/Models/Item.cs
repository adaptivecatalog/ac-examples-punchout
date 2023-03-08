namespace Service.Models;

public class Item
{
    public string? Id { get; set; }
    public string? Username { get; set; }
    public string? ProductId { get; set; }
    public string? Catalog { get; set; }
    public required string Workspace { get; set; }
}
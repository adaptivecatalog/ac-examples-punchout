namespace Service.Models;

public class PunchoutOrder
{
    public IEnumerable<PunchoutProduct>? Items { get; set; }
    public required string Id { get; set; }
}
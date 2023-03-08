namespace Service.Models;

public class PunchoutOrder
{
    public IEnumerable<PunchoutProduct>? Items { get; set; }
    public string Id { get; set; }
}
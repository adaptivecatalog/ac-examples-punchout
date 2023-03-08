using System.ComponentModel.DataAnnotations.Schema;

namespace Service.Models;

public class PunchoutProduct
{   
    public decimal? UnitPrice { get; set; }
    public decimal? Msrp { get; set; }
    [NotMapped]
    public Dictionary<string, string>? Facets { get; set; }
    [NotMapped]
    public Dictionary<string, string>? Attributes { get; set; }
    public string? Description { get; set; }
    public string? ProductName { get; set; }
    public string? Segment { get; set; }
    public string? ManufacturerName { get; set; }
    public string? VendorName { get; set; }
    public string? VendorPartNumber { get; set; }
    public decimal? Quantity { get; set; }
    public string? ManufacturerPartNumber { get; set; }
    public string? Category { get; set; }
    public string? SubCategory { get; set; }
    public string? ImageUrl { get; set; }
    public string? Id { get; set; }
}
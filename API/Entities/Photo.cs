using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;
[Table("Photos")]
public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }

    // Navigation property

    public int AppUserId { get; set; } // Foreign key property
    public AppUser AppUser { get; set; } = null!; // Initialize to null to avoid null reference issues
    
    
}

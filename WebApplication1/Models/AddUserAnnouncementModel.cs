using System;

namespace WebApplication1.Models
{
    public class AddUserAnnouncementModel
    {
        public Guid UserId { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
    }
}

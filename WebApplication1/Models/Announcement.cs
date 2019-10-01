using MongoDB.Bson.Serialization.Attributes;
using System;

namespace WebApplication1.Models
{
    public class UserAnnouncement
    {
        [BsonElement("_id")] [BsonId] public Guid UserId;
        [BsonElement("a")] public Announcement[] Announcements;
    }

    public class Announcement
    {
        [BsonElement("u")] [BsonIgnoreIfDefault] public string Url;
        [BsonElement("d")] [BsonIgnoreIfDefault] public string Description;
    }
}

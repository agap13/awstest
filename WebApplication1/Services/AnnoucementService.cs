using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class AnnoucementService
    {
        private readonly IMongoCollection<UserAnnouncement> _announcement;
        public AnnoucementService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _announcement = database.GetCollection<UserAnnouncement>(settings.CollectionName);
        }

        public async Task<List<UserAnnouncement>> GetAll(CancellationToken ct)
        {
            return await _announcement.Find(x => true)?.ToListAsync(ct);
        }

        public async Task<List<UserAnnouncement>> GetAllForUser(Guid userId, CancellationToken ct)
        {
            return await _announcement.Find(d => d.UserId == userId).ToListAsync(ct);
        }

        public async Task<UserAnnouncement> Create(UserAnnouncement announcement, CancellationToken ct)
        {
            await _announcement.InsertOneAsync(announcement, null, ct);
            return announcement;
        }

        public async Task Update(UserAnnouncement announcement, CancellationToken ct)
        {
            var filter = Builders<UserAnnouncement>.Filter.Eq("_id", announcement.UserId);
            var user = _announcement.Find(filter).FirstOrDefault();
            if (user != null)
            {
                var results = await _announcement.ReplaceOneAsync(filter, announcement);
            }
            else
            {
                await Create(announcement, ct);
            }
        }
    }
}

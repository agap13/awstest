using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    public class AnnoucemnentsController : Controller
    {
        private readonly AnnoucementService _annoucementService;

        public AnnoucemnentsController(AnnoucementService annoucementService)
        {
            _annoucementService = annoucementService;
        }

        [HttpGet]
        public async  Task<IEnumerable<UserAnnouncement>> Get(CancellationToken ct)
        {
            return await _annoucementService.GetAll(ct);
        }

        [HttpPost]
        public async Task Post([FromBody]AddUserAnnouncementModel announcement, CancellationToken ct)
        {
            var announcements = await GetForUser(announcement.UserId, ct);
            if (announcement != null)
            {
                announcements.Add(new Announcement() { Url = announcement.Url, Description=announcement.Description});
            }
            await _annoucementService.Update(new UserAnnouncement() { UserId = announcement.UserId, Announcements = announcements.ToArray() }, ct);
        }

        private async Task<List<Announcement>> GetForUser(Guid userId, CancellationToken ct)
        {
            var allForUser = await _annoucementService.GetAllForUser(userId, ct);
            return allForUser?.SelectMany(x => x.Announcements).ToList();
        }
    }
}
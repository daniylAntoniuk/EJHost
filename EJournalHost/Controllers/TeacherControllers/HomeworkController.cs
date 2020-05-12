using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EJournal.Data.EfContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EJournal.Controllers.TeacherControllers
{
    [Authorize(Roles = "Teacher")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class HomeworkController : ControllerBase
    {
        private readonly EfDbContext _context;

        public HomeworkController(EfDbContext context)
        {
            _context = context;
        }

        [HttpGet("teacher/gethomework")]
        public IActionResult GetHomework()
        {
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;

            //List<int> ids = _context.Lessons.Where(x => x.TeacherId == userId).ToList();

            return Ok();
        }
    }
}
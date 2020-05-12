using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EJournal.Data;
using EJournal.Data.EfContext;
using EJournal.Data.Entities;
using EJournal.Data.Interfaces;
using EJournal.ViewModels.AdminViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EJournal.Controllers.AdminControllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [Authorize(Roles = "Director,DDeputy")]
    public class ChangeTimetableController : ControllerBase
    {
        private readonly EfDbContext _context;
        private readonly ITeachers _teachersRepo;
        private readonly IGroups _groupRepo;
        public ChangeTimetableController(IGroups groupRepo, EfDbContext context, ITeachers teachersRepo)
        {
            _context = context;
            _teachersRepo = teachersRepo;
            _groupRepo = groupRepo;
        }
        [HttpGet("get-teachers")]
        public IActionResult GetTeachers()
        {
            var tea = _teachersRepo.GetTeachers();
            return Ok(tea);
        }
        [HttpPost("get-groups")]
        public IActionResult GetGroups([FromBody] GetGroupsTimetableViewModel model)
        {
            List<Group> groups = new List<Group>();
            foreach (var el in _groupRepo.GetGroupsByTeacherId(model.Teacher))
            {
                if (groups.FirstOrDefault(x => x.Id == el.Id) == null)
                {
                    groups.Add(el);
                }
            }
            return Ok(groups);
        }
        [HttpPost("get-subjects")]
        public IActionResult GetSubjects([FromBody] GetSubjectsTimetableViewModel model)
        {
            List<Subject> subjects = new List<Subject>();
            foreach (var el in _context.GroupToSubjects.Where(x => x.TeacherId == model.Teacher &&
            x.GroupId == int.Parse(model.Group)).Select(x => x.Subject))
            {
                if (subjects.FirstOrDefault(x => x.Id == el.Id) == null)
                {
                    subjects.Add(el);
                }
            }
            return Ok(subjects);
        }
        [HttpPost("get-auditories")]
        public IActionResult GetAuditories([FromBody] GetAuditoriesTimetableViewModel model)
        {
            int res = 1;
            List<Auditorium> auditoria = _context.Auditoriums.Where(t => t.Number >= _context.GroupsToStudents.Where(x => x.GroupId == int.Parse(model.Group)).Count()).AsNoTracking().ToList();
            foreach (var el in _context.Lessons.Where(x => x.LessonDate.Date >= Convert.ToDateTime(model.DateFrom).Date &&
                     x.LessonDate.Date <= Convert.ToDateTime(model.DateTo).Date && x.GroupId == int.Parse(model.Group)).AsNoTracking())
            {
                foreach (var elem in model.DaysOfWeek)
                {
                    if ((int)el.LessonDate.DayOfWeek == elem)
                    {
                        foreach (var ele in model.Numbers)
                        {
                            if (el.LessonNumber == ele)
                            {
                                res = 0;
                                //auditoria.Remove(auditoria.FirstOrDefault(x => x.Id == el.AuditoriumId));
                            }
                        }
                    }
                }
            }
            if (res == 0)
            {
                return BadRequest();
            }
            foreach (var el in _context.Lessons.Where(x => x.LessonDate.Date >= Convert.ToDateTime(model.DateFrom).Date &&
                     x.LessonDate.Date <= Convert.ToDateTime(model.DateTo).Date ).AsNoTracking())
            {
                foreach (var elem in model.DaysOfWeek)
                {
                    if ((int)el.LessonDate.DayOfWeek == elem)
                    {
                        foreach (var ele in model.Numbers)
                        {
                            if (el.LessonNumber == ele)
                            {
                                auditoria.Remove(auditoria.FirstOrDefault(x => x.Id == el.AuditoriumId));
                            }
                        }
                    }
                }
            }
            

            return Ok(auditoria);
        }
        [HttpPost("save")]
        public IActionResult Save([FromBody] SaveViewModel model)
        {
            foreach (var item in model.DaysOfWeek)
            {
                for (DateTime i = Convert.ToDateTime(model.DateFrom).Date; i.Date != Convert.ToDateTime(model.DateTo).Date; i=i.AddDays(1))
                {

                    if ((int)i.DayOfWeek == item)
                    {
                        foreach (var el in model.Numbers)
                        {
                            string timeGap = "";
                            switch (el)
                            {
                                case 1:
                                    timeGap = "8:30 - 9:50";
                                    break;
                                case 2:
                                    timeGap = "10:00 - 11:20";
                                    break;
                                case 3:
                                    timeGap = "11:50 - 13:10";
                                    break;
                                case 4:
                                    timeGap = "13:20 - 14:40";
                                    break;
                                default:
                                    break;
                            }
                            _context.Lessons.Add(new Lesson()
                            {
                                AuditoriumId = model.Auditory,
                                LessonDate = i,
                                LessonNumber = el,
                                LessonTimeGap = timeGap,
                                GroupId = model.Group,
                                SubjectId = model.Subject,
                                TeacherId = model.Teacher
                            });
                            _context.SaveChanges();
                        }
                    }

                }
            }

            return Ok();
        }
    }
}
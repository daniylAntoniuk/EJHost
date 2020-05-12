using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using EJournal.Data.EfContext;
using EJournal.Data.Models;
using EJournal.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EJournal.Controllers.TeacherControllers
{
    [Authorize(Roles = "Teacher")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class GetLessonsController : ControllerBase
    {
        private readonly EfDbContext _context;
        public GetLessonsController(EfDbContext context)
        {
            _context = context;
        }

        [HttpPost("get/timetable")]
        public IActionResult GetLessons([FromBody]GetTeacherTimetableMode model)
        {
            var claims = User.Claims;
            var id = claims.FirstOrDefault().Value;
            DateTime date_from = Convert.ToDateTime(model.dateFrom);
            DateTime date_to = Convert.ToDateTime(model.dateTo);
            var lessons = _context.Lessons.Where(l => DateTime.Compare(l.LessonDate, date_from) >= 0 && DateTime.Compare(l.LessonDate, date_to) <= 0 && l.TeacherId == id);
            List<TeacherTimeTableModel> timetable = new List<TeacherTimeTableModel>();
            timetable = lessons.Select(t => new TeacherTimeTableModel()
            {
                AuditoriumNumber = t.Auditorium.Number,
                DayOfWeek = t.LessonDate.DayOfWeek,
                LessonNumber = t.LessonNumber,
                SubjectName = t.Subject.Name,
                LessonTimeGap = t.LessonTimeGap,
                GroupName = t.Group.Name,
                LessonDate = t.LessonDate.Date.ToString("dd.MM.yyyy"),
                IsLessonBe = " "
            }).ToList();

            var res = new GetTeacherTimetableViewMode()
            {
                Timetable = timetable
            };
            return Ok(res);
        }
    }
}
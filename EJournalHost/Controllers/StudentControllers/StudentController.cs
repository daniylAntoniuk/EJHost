using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EJournal.Data.EfContext;
using EJournal.Data.Models;
using EJournal.ViewModels;
using EJournal.ViewModels.StudentViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EJournal.Controllers.StudentControllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [Authorize(Roles = "Student")]
    public class StudentController : ControllerBase
    {
        private readonly EfDbContext _context;
        public StudentController(EfDbContext context)
        {
            _context = context;
        }
        [HttpPost("get/timetable")]
        public IActionResult GetTimetable([FromBody]GetTimetableModel model)
        {
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;
            var now = DateTime.Now;
            if (!string.IsNullOrEmpty(model.Month))
            {
                now = new DateTime(now.Year, int.Parse(model.Month), 1);
            }
            var group = _context.Groups.FirstOrDefault(x => x.Id == _context.GroupsToStudents.FirstOrDefault(t => t.StudentId == userId && t.Group.YearTo.Year >= now.Year).GroupId).Name;
            var lessons = _context.Lessons.Where(x => x.Group.Name == group).Where(x => x.LessonDate.Month == now.Month && x.LessonDate.Year == now.Year);
            List<TimetableModel> timetable = new List<TimetableModel>();
            timetable = lessons.Select(t => new TimetableModel()
            {
                AuditoriumNumber = "ауд " + t.Auditorium.Number.ToString(),
                LessonDate = t.LessonDate.Date.ToString(),
                TeacherName = t.Teacher.BaseProfile.Name + " " + t.Teacher.BaseProfile.LastName,
                LessonNumber = t.LessonNumber,
                Day = t.LessonDate.Day.ToString(),
                SubjectName = t.Subject.Name,
                LessonTimeGap = t.LessonTimeGap,
                Topic = t.JournalColumn.Topic
            }).OrderBy(x => x.LessonDate).ToList();
            var result = new TimetableViewModel()
            {
                DayOfWeek = new DateTime(now.Year, now.Month, 1).DayOfWeek.ToString(),
                DaysInMonth = DateTime.DaysInMonth(now.Year, now.Month).ToString(),
                Timetable = timetable,
                Month = now.Month.ToString()
            };
            return Ok(result);
        }
        [HttpGet("homepage")]
        public IActionResult GetHomePage()
        {
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;
            var marks = _context.Marks.Where(x => x.StudentId == userId).OrderByDescending(x => x.JournalColumn.Lesson.LessonDate).Take(5);
            var res = new List<MarkViewModel>();
            res = marks.Select(t => new MarkViewModel
            {
                Value = t.Value,
                Date = t.JournalColumn.Lesson.LessonDate.ToString("dd/MM/yyyy"),
                Subject = t.JournalColumn.Lesson.Subject.Name
            }).ToList();
            var avg = _context.Marks.Where(x => x.StudentId == userId && x.IsPresent == true).Include(t => t.JournalColumn).Include(t => t.JournalColumn.Lesson);
            List<string> arr = new List<string>();
            for (int i = 9; i != 7; i++)
            {
                if (i != 7 || i != 8)
                {
                    if (avg.Where(x => x.JournalColumn.Lesson.LessonDate.Month == i).Count() != 0)
                    {
                        arr.Add(Math.Round(avg.Where(x => x.JournalColumn.Lesson.LessonDate.Month == i).ToList().Average(x => int.Parse(x.Value))).ToString());
                    }
                    else
                    {
                        arr.Add("0");
                    }
                }
                if (i == 12)
                {
                    i = 0;
                }
            }


            var group = _context.Groups.FirstOrDefault(x => x.Id == _context.GroupsToStudents.FirstOrDefault(t => t.StudentId == userId && t.Group.YearTo.Year >= DateTime.Now.Year).GroupId);
            var countLessons = _context.Marks.Where(x => x.StudentId == userId && x.JournalColumn.Lesson.GroupId == group.Id && x.JournalColumn.Lesson.LessonDate.Year == DateTime.Now.Year);
            var count = countLessons.Where(x => x.IsPresent == false).Count();

            var attendance = 0;
            if (count != 0)
            {
                attendance = (count * 100) / countLessons.Count();

            }
            var lessons = _context.Lessons.Where(x => x.Group.Id == group.Id).Where(x => x.LessonDate.Day == DateTime.Now.Day && x.LessonDate.Year == DateTime.Now.Year);
            //List<TimetableModel> timetable = new List<TimetableModel>();
            //timetable = lessons.Select(t => new TimetableModel()
            //{
            //    AuditoriumNumber = "ауд " + t.Auditorium.Number.ToString(),
            //    LessonDate = t.LessonDate.Date.ToString(),
            //    TeacherName = t.Teacher.BaseProfile.Name + " " + t.Teacher.BaseProfile.LastName,
            //    LessonNumber = t.LessonNumber,
            //    Day = t.LessonDate.Day.ToString(),
            //    SubjectName = t.Subject.Name,
            //    LessonTimeGap = t.LessonTimeGap,
            //    Topic = t.JournalColumn.Topic
            //}).ToList();
            if(marks.Count()!=0)
            return Ok(new HomePageViewModel()
            {
                Marks = res,
                Month = DateTime.Now.Month.ToString(),
                CountOfDays = attendance.ToString(),
                Day = DateTime.Now.Day.ToString(),
                //Timetable = timetable,
                AverageMarks = arr,
                AverageMark = avg.ToList().Average(x => double.Parse(x.Value)).ToString()
            });
            else
                return Ok(new HomePageViewModel()
                {                   
                    Month = DateTime.Now.Month.ToString(),
                    CountOfDays = attendance.ToString(),
                    Day = DateTime.Now.Day.ToString(),
                    //Timetable = timetable,
                    AverageMarks = arr,
                    AverageMark = "0"
                });
        }


        [HttpPost("homework")]
        public IActionResult GetHomework([FromBody] GetHomeworkModel model)
        {
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;
            var group = _context.Groups.FirstOrDefault(x => x.Id == _context.GroupsToStudents.FirstOrDefault(t => t.StudentId == userId && t.Group.YearTo.Year >= DateTime.Now.Year).GroupId).Id;
            var lessons = new List<HomeworkModel>();
            if (!string.IsNullOrEmpty(model.Subject))
            {
                lessons = _context.Lessons.Where(x => x.GroupId == group && x.Subject.Id == int.Parse(model.Subject) && x.JournalColumn.Homework != null).OrderByDescending(x => x.LessonDate).Take(15).Select(t => new HomeworkModel()
                {
                    Teacher = t.Teacher.BaseProfile.Name + ' ' + t.Teacher.BaseProfile.Surname,
                    Subject = t.Subject.Name,
                    Topic = t.JournalColumn.Topic,
                    Homework = t.JournalColumn.Homework,
                    Date = t.LessonDate.ToString("dd.MM.yyyy")
                }).ToList();
            }
            else if (!string.IsNullOrEmpty(model.Date))
            {
                var date = Convert.ToDateTime(model.Date);
                lessons = _context.Lessons.Where(x => x.GroupId == group && x.LessonDate.Date == date.Date && x.JournalColumn.Homework != null).OrderByDescending(x => x.LessonDate).Take(15).Select(t => new HomeworkModel()
                {
                    Teacher = t.Teacher.BaseProfile.Name + ' ' + t.Teacher.BaseProfile.Surname,
                    Subject = t.Subject.Name,
                    Topic = t.JournalColumn.Topic,
                    Homework = t.JournalColumn.Homework,
                    Date = t.LessonDate.ToString("dd.MM.yyyy")
                }).ToList();
            }
            else
            {
                lessons = _context.Lessons.Where(x => x.GroupId == group && x.JournalColumn.Homework != null).OrderByDescending(x => x.LessonDate).Take(15).Select(t => new HomeworkModel()
                {
                    Teacher = t.Teacher.BaseProfile.Name + ' ' + t.Teacher.BaseProfile.Surname,
                    Subject = t.Subject.Name,
                    Topic = t.JournalColumn.Topic,
                    Homework = t.JournalColumn.Homework,
                    Date = t.LessonDate.ToString("dd.MM.yyyy")
                }).ToList();
            }
            return Ok(new HomeworkViewModel()
            {
                Homeworks = lessons,
                Subjects = _context.GroupToSubjects.Where(x => x.Group.Id == group).Select(x => x.Subject).ToList()
            });
        }
        [HttpGet("news")]
        public IActionResult GetNews()
        {

            var news = _context.News.OrderByDescending(x => x.DateOfCreate).Take(6);
            return Ok(new NewsViewModel()
            {
                News = news.Select(t => new EJournal.ViewModels.StudentViewModels.NewsModel()
                {
                    Content = t.Content,
                    DateOfCreate = t.DateOfCreate.ToString("dd.MM.yyyy"),
                    Id = t.Id,
                    Teacher = t.TeacherProfile.BaseProfile.Name + " " + t.TeacherProfile.BaseProfile.Surname + " " + t.TeacherProfile.BaseProfile.LastName,
                    Topic = t.Topic
                }).ToList()
            });
        }
        [HttpGet("group-news")]
        public IActionResult GetGroupNews()
        {
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;
            var groupId = _context.Groups.FirstOrDefault(x => x.Id == _context.GroupsToStudents.FirstOrDefault(t => t.StudentId == userId && t.Group.YearTo.Year >= DateTime.Now.Year).GroupId).Id;
            var news = _context.GroupNews.Where(x => x.GroupId == groupId).OrderByDescending(x => x.DateOfCreate).Take(10);
            return Ok(new NewsViewModel()
            {
                News = news.Select(t => new EJournal.ViewModels.StudentViewModels.NewsModel()
                {
                    Content = t.Content,
                    DateOfCreate = t.DateOfCreate.ToString("dd.MM.yyyy"),
                    Id = t.Id,
                    Teacher = t.TeacherProfile.BaseProfile.Name + " " + t.TeacherProfile.BaseProfile.Surname + " " + t.TeacherProfile.BaseProfile.LastName,
                    Topic = t.Topic
                }).ToList()
            });
        }
    }

}
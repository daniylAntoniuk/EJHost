using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EJournal.Data.EfContext;
using EJournal.Data.Entities;
using EJournal.Data.Entities.AppUeser;
using EJournal.Data.Interfaces;
using EJournal.Services;
using EJournal.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EJournal.Controllers.TeacherControllers
{
    [Authorize(Roles ="Teacher")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MarksController : ControllerBase
    {
        private readonly EfDbContext _context;
        private readonly UserManager<DbUser> _userManager;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IMarks _marks;

        public MarksController(EfDbContext context, UserManager<DbUser> userManager, 
            IJwtTokenService jwtTokenService, IMarks marks)
        {
            _context = context;
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
            _marks = marks;
        }

        [HttpGet("teacher/getsubject")]
        public IActionResult GetSubject()
        {
            try
            {
                var claims = User.Claims;
                var userId = claims.FirstOrDefault().Value;
                //var curator = _context.TeacherProfiles.FirstOrDefault(x => x.Id == userId);
                var group = _context.Groups.FirstOrDefault(x => x.TeacherId == userId /*&&*/ /*(x.YearTo.Year == DateTime.Now.Year || x.YearFrom.Year == DateTime.Now.Year)*/);
                List<SubjectsViewModel> subjects = _context.GroupToSubjects.Where(x => x.GroupId == group.Id)
                    .Select(x => new SubjectsViewModel
                    {
                        Name = x.Subject.Name,
                        Id = x.Subject.Id
                    }).ToList();


                return Ok(subjects);
            }
            catch(Exception ex)
            {
                return BadRequest("Error: " + ex.Message);
            }
        }

        [HttpPost("teacher/getmarks")]
        public IActionResult GetMarksCurator([FromBody] MarksFilterModel model)
        {
            //try
            //{
            //    if (!ModelState.IsValid)
            //    {
            //        return "Виберіть предмет або місяць";
            //    }
            //    var claims = User.Claims;
            //    var userId = claims.FirstOrDefault().Value;
            //    var group = _context.Groups.FirstOrDefault(x => x.TeacherId == userId && (x.YearTo.Year == DateTime.Now.Year || x.YearFrom.Year == DateTime.Now.Year));

            //    var listMarks = new List<IEnumerable<Mark>>();
            //    for(int i=1; i<=31; i++)
            //    {
            //        var data = $"{i}/{model.Month}/{DateTime.Now.Year}";
            //        var marks = _marks.GetMarksInGroup(group.Id, model.SubjectId, data);
            //        listMarks.Add(marks);
            //    }
            //    return Ok(listMarks);
            //}
            //catch(Exception ex)
            //{
            //    return BadRequest("Error: " + ex.Message);
            //}
            if(model == null)
            {
                return BadRequest("Виберіть предмет або місяць");
            }
            else
            {
                MarksTableModel table = new MarksTableModel();
                List<MarksRowModel> tableList = new List<MarksRowModel>();
                
                var claims = User.Claims;
                var userId = claims.FirstOrDefault().Value;

                //var subjectId = _context.Subjects.FirstOrDefault(t => t.Name == model.SubjectName).Id;

                var group = _context.Groups.FirstOrDefault(x => x.TeacherId == userId/* && (x.YearTo.Year == DateTime.Now.Year || x.YearFrom.Year == DateTime.Now.Year)*/);
                
                int jourId = _context.Journals.FirstOrDefault(t => t.GroupId == group.Id).Id;
                
                var jourCols = _context.JournalColumns.Where(t => t.JournalId == jourId && t.Lesson.SubjectId == model.SubjectId);
                var lessonDates = jourCols.Select(t => t.Lesson.LessonDate).ToList();
                lessonDates.OrderByDescending(d => d);
                var students = _context.GroupsToStudents.Where(t => t.GroupId == group.Id).Select(t => t.Student);

                foreach(var item in students)
                {
                    var studMarks = _context.Marks.Where(t => jourCols.Contains(t.JournalColumn) && t.StudentId == item.Id);
                    var marksFormatted = new List<string>();
                    //var listMarks = new List<string>();
                    var baseP = _context.BaseProfiles.FirstOrDefault(t => t.Id == item.Id);
                    string name = baseP.Name + " " + baseP.LastName + " " + baseP.Surname;
                    foreach (var date in lessonDates)
                    {
                        var cell = studMarks.FirstOrDefault(m => m.JournalColumn.Lesson.LessonDate == date);
                        if (cell != null)
                            marksFormatted.Add(cell.Value);
                        else
                            marksFormatted.Add(" ");
                        //var baseP = _context.BaseProfiles.FirstOrDefault(t => t.Id == item.Id);
                        //string name = baseP.Name + " " + baseP.LastName + " " + baseP.Surname;
                        
                    }
                    MarksRowModel rowModel = new MarksRowModel
                    {
                        Name = name,
                        Marks = marksFormatted
                    };

                    tableList.Add(rowModel);

                    List<string> cols = new List<string>();
                    cols.Add("#");
                    cols.Add("ПІБ");
                    int lenght = lessonDates.Count;
                    for (int i = 0; i < lenght; i++)
                    {
                        cols.Add(lessonDates[i].ToString("dd.MM.yyyy"));
                    }
                    table.rows = tableList;
                    table.columns = cols;
                }

                return Ok(table);
            }
        }
    }
}
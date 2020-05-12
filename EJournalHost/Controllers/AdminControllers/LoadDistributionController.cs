using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EJournal.Data.EfContext;
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
    public class LoadDistributionController : ControllerBase
    {
        private readonly EfDbContext _context;
        private readonly IGroups _groupRepo;
        public LoadDistributionController(EfDbContext context, IGroups groupRepo)
        {
            _context = context;
            _groupRepo = groupRepo;
        }
        [HttpGet("get-groups")]
        public IActionResult GetGroups()
        {
            return Ok(_groupRepo.GetGroups());
        }
        [HttpPost("get-spec")]
        public IActionResult GEtBySpec([FromBody] GetGroupViewModel model)
        {
            if (string.IsNullOrEmpty(model.Speciality) || model.Speciality == "0")
            {

                var gr = _context.Groups.AsNoTracking().ToList();
                var sp = _context.Specialities.AsNoTracking().ToList();

                var res = new GetGroupsViewModel()
                {
                    Specialities = new List<Data.Entities.Speciality>(),
                    Groups = new List<Data.Entities.Group>()
                };
                res.Specialities = sp;
                res.Groups = gr;
                return Ok(res);
            }
            else
            {
                var gr = _context.Groups.AsNoTracking().Where(x => x.SpecialityId == int.Parse(model.Speciality)).ToList();
                var sp = _context.Specialities.AsNoTracking().ToList();

                var res = new GetGroupsViewModel()
                {
                    Specialities = new List<Data.Entities.Speciality>(),
                    Groups = new List<Data.Entities.Group>()
                };
                res.Specialities = sp;
                res.Groups = gr;
                return Ok(res);
            }
        }
        [HttpPost("get-subjects")]
        public IActionResult GetSubjects([FromBody] FiltersModel model)
        {
            var subj = _context.GroupToSubjects.Where(x => x.GroupId == model.GroupId);
            var res = subj.Select(x => new SubjectsModel()
            {
                Id = x.SubjectId,
                Name = x.Subject.Name,
                SelectedTeacherId = x.TeacherId,
                Teachers = x.Subject.TeacherToSubjects.Select(t => new TeacherModel()
                {
                    Id = t.TeacherId,
                    Name = t.Teacher.BaseProfile.Name + " " + t.Teacher.BaseProfile.Surname + " " + t.Teacher.BaseProfile.LastName
                }).ToList()
            }).ToList();
            return Ok(new GetSubjectViewModel()
            {
                Group = model.GroupId.ToString(),
                Subjects = res
            });
        }
        [HttpPost("change-teacher")]
        public IActionResult ChangeTeacher([FromBody]ChangeTeacherViewModel model)
        {
            _context.GroupToSubjects.FirstOrDefault(x => x.GroupId == int.Parse(model.GroupId)
            && x.SubjectId == int.Parse(model.SubjectId)).TeacherId = model.TeacherId;
            _context.SaveChanges();
            return Ok();
        }
    }
}
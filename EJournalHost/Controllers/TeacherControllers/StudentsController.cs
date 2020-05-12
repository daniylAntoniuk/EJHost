using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EJournal.Data.EfContext;
using EJournal.Data.Entities.AppUeser;
using EJournal.Data.Interfaces;
using EJournal.Data.Models;
using EJournal.Data.Repositories;
using EJournal.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EJournal.Controllers.TeacherControllers
{
    [Authorize(Roles = "Curator")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly EfDbContext _context;
        private readonly IStudents _studentRepository;
        public StudentsController(UserManager<DbUser> userManager, EfDbContext context, IStudents studentRepository)
        {
            _context = context;
            _userManager = userManager;
            _studentRepository = studentRepository;
        }
        [HttpGet("get/students")]
        public IActionResult GetStudentsAsync()
        {
            //try
            //{
                var claims = User.Claims;
                var userId = claims.FirstOrDefault().Value;
                var group = _context.Groups.FirstOrDefault(x => x.TeacherId == userId);
                IEnumerable<GetStudentInfoWithGroup> listStudents = _studentRepository.GetStudentsByGroup(group.Id);
                List<CuratorCardStudentModel> cards = new List<CuratorCardStudentModel>();

                var cards1 = listStudents.Select(t => new CuratorCardStudentModel {
                    Name = t.Name,
                    Image = t.Image,
                    Adress = t.Adress,
                    DateOfBirth= t.DateOfBirth,
                    Email = t.Email,
                    Id = t.Id,
                    LastName= t.LastName,
                    PhoneNumber = t.PhoneNumber, 
                    Surname= t.Surname,
                    AddressOfChummery = "a",
                    Group = group.Name,
                    Progress = "v",
                    Speciality = t.Speciality

                }).ToList();
                return Ok(cards1);
            //}
            //catch (Exception ex)
            //{
            //    return BadRequest("Error: " + ex.Message + " I: " + ex.InnerException);
            //}
        }
    }
}
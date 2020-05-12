using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EJournal.Data.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EJournal.Controllers.StudyRoomHeadControllers
{
    [Authorize(Roles = "StudyRoomHead")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class StudyRoomHeadController : ControllerBase
    {
        private readonly IStudents _students;
        private readonly ISpecialities _specialities;
        private readonly IGroups _groups;

        public StudyRoomHeadController(IStudents students, 
            ISpecialities specialities,
            IGroups groups)
        {
            _students = students;
            _specialities = specialities;
            _groups = groups;
        }

        [HttpGet]
        [Route("get/allStudentsBySpeciality")]
        public IActionResult GetStudentsBySpecialities()
        {
            string teacherId = User.FindFirstValue("id");

            var students = _students.GetAllStudentsBySpecialities(teacherId);

            return Ok(students);
        }

        [HttpGet]
        [Route("get/specialitiesByStudyRoomHead")]
        public IActionResult GetSpecialitiesByManager()
        {
            string managerId = User.FindFirstValue("id");

            var specialities = _specialities.GetSpecialitiesByManager(managerId);

            return Ok(specialities);
        }

        [HttpGet]
        [Route("get/groupsBySpeciality/specialityId={specialityId}")]
        public IActionResult GetGroupsBySpeciality(int specialityId)
        {
            var groups = _groups.GetGroupsBySpeciality(specialityId);

            return Ok(groups);
        }

        [HttpGet]
        [Route("get/studentsByGroup/groupId={groupId}")]
        public IActionResult GetStudentsByGroup(int groupId)
        {
            var groups = _students.GetStudentsByGroup(groupId);

            return Ok(groups);
        }

        [HttpGet]
        [Route("get/studentsBySpeciality/specialityId={specialityId}")]
        public IActionResult GetStudentsBySpeciality(int specialityId)
        {
            var groups = _students.GetStudentsBySpeciality(specialityId);

            return Ok(groups);
        }
    }
}
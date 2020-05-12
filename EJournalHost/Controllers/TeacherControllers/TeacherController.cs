using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EJournal.Controllers.TeacherControllers
{
    [Authorize(Roles = "Teacher")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TeacherController : ControllerBase
    {
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EJournal.Data.EfContext;
using EJournal.Data.Entities.AppUeser;
using EJournal.Services;
using EJournal.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace EJournal.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly SignInManager<DbUser> _signInManager;       
        private readonly EfDbContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;

        public AccountController(UserManager<DbUser> userManager,
                            SignInManager<DbUser> signInManager,
                            EfDbContext context,
                            IWebHostEnvironment env,
                            IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _env = env;
            _configuration = configuration;
        }

        [HttpGet("get-image")]        
        public IActionResult GetImage()
        {
            var userId = User.Claims.ToList()[0].Value;
            var user = _context.BaseProfiles.FirstOrDefault(u => u.Id == userId);
         
                string path = $"{_configuration.GetValue<string>("UserUrlImages")}/250_";
                string imagePath = user.Image != null ? path + user.Image :
                        path + _configuration.GetValue<string>("DefaultImage");           

                return Ok(imagePath);
        }

        [HttpPost("change-image")]
        [RequestSizeLimit(100 * 1024 * 1024)]
        public IActionResult ChangeImage([FromBody] ChangeImage model)
        {
            string image = null;

            var userId = User.Claims.ToList()[0].Value;
            var user = _context.BaseProfiles.FirstOrDefault(u => u.Id == userId);

            if(user !=null)
            {
                string imageName = user.Image ?? Guid.NewGuid().ToString() + ".jpg";
                string pathSaveImages = InitStaticFiles
                    .CreateImageByFileName(_env, _configuration,
                    new string[] { "ImagesPath", "ImagesUserPath" },
                    imageName, model.Image);

                if(pathSaveImages != null)
                {
                    image = imageName;
                    user.Image = image;
                    _context.SaveChanges();
                }
                else
                {
                    image = user.Image;
                }              
            }

            string path = $"{_configuration.GetValue<string>("UserUrlImages")}/250_";
            string imagePath = image != null ? path + image :
                    path + _configuration.GetValue<string>("DefaultImage");

            return Ok(imagePath);
        }
    }
}
using System;
using System.Collections.Generic;

using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using EJournal.Data.EfContext;
using EJournal.Data.Entities.AppUeser;
using EJournal.Data.Models;
using EJournal.Services;
using EJournal.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace EJournal.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    //[ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly SignInManager<DbUser> _signInManager;
        private readonly EfDbContext _context;
        private readonly IJwtTokenService _jwtTokenService;
        public AuthController(EfDbContext context, UserManager<DbUser> userManager, SignInManager<DbUser> sigInManager,
            IJwtTokenService jwtTokenService)
        {
            _userManager = userManager;
            _signInManager = sigInManager;
            _context = context;
            _jwtTokenService = jwtTokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Введіть всі данні");
            }
            var user = _context.Users.Include(u=> u.BaseProfile).FirstOrDefault(x => x.Email == model.Email);
            if (user == null)
            {
                return BadRequest("Не правильна електронна пошта!");
            }
            var res = _signInManager
                .PasswordSignInAsync(user, model.Password, false, false).Result;
            if (!res.Succeeded)
            {
                return BadRequest("Не правильний пароль!");
            }

            await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok(new {token=_jwtTokenService.CreateToken(user)});
        }        
        [Authorize]
        [HttpPost("changepassword")]
        //its change password not forgot password !!!
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Введіть всі данні");
            }
            if (model.Password != model.ConfirmPassword)
            {
                return BadRequest("Паролі не збігаються");
            }
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;
            var user = _context.Users.FirstOrDefault(x => x.Id == userId);
            if (user == null)
            {              
                return BadRequest();
            }
           
            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new {invalid = "Старий пароль не вірний" });
            }
           //var res = _userManager.PasswordHasher.HashPassword(user, model.Password);
           //user.PasswordHash = res;
           //var result = await _userManager.UpdateAsync(user);
            return Ok(result);
        }
        [Authorize]
        [HttpGet("profile")]
        public IActionResult Profile()
        {
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;
            var user = _context.Users.FirstOrDefault(x => x.Id == userId);
            var baseProfile = _context.BaseProfiles.FirstOrDefault(x => x.Id == userId);
            return Ok(new ProfileViewModel()
            {
                Adress = baseProfile.Adress,
                DateOfBirth = baseProfile.DateOfBirth.ToString("dd/MM/yyyy"),
                Email = user.Email,
                Name = baseProfile.Name + " " + baseProfile.Surname + " " + baseProfile.LastName,
                Phone = user.PhoneNumber
            });
        }
    }
}
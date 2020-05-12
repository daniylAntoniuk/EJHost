using EJournal.Data.EfContext;
using EJournal.Data.Entities.AppUeser;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace EJournal.Services
{
    public interface IJwtTokenService
    {
        string CreateToken(DbUser user);
    }
    public class JwtTokenService : IJwtTokenService
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly EfDbContext _context;
        private readonly IConfiguration _configuration;
        public JwtTokenService(UserManager<DbUser> userManager, EfDbContext context,
            IConfiguration configuration)
        {
            _configuration = configuration;
            _userManager = userManager;
            _context = context;
        }
        public string CreateToken(DbUser user)
        {
            var roles = _userManager.GetRolesAsync(user).Result;
            roles = roles.OrderBy(x => x).ToList();
            var image = user.BaseProfile.Image;

            if (image == null)
            {
                image = _configuration.GetValue<string>("DefaultImage");
            }
            List<Claim> claims = new List<Claim>()
            {
                new Claim("id",user.Id),
                new Claim("name",user.BaseProfile.Name+" "+user.BaseProfile.Surname+" "+user.BaseProfile.LastName),
                new Claim("image",image)
            };
            foreach(var el in roles)
            {
                claims.Add(new Claim("roles", el));
            }

            //var now = DateTime.UtcNow;
            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("gachi-muchi-secret-key"));
            var signinCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                signingCredentials: signinCredentials,
                expires: DateTime.Now.AddDays(1),
                claims: claims
                );
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}

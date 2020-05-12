using EJournal.Data.EfContext;
using EJournal.Data.Entities;
using EJournal.Data.Entities.AppUeser;
using EJournal.Data.Interfaces;
using EJournal.Data.Models;
using EJournal.Services;
using EJournal.ViewModels;
using EJournal.ViewModels.AdminViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Repositories
{
    public class TeacherRepository : ITeachers
    {
        private readonly UserManager<DbUser> _userManager;

        private readonly EfDbContext _context;
        public TeacherRepository(EfDbContext context, UserManager<DbUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<bool> AddTeacherAsync(AddTeacherModel profile)
        {
            try
            {
                DbUser user = new DbUser
                {
                    UserName = profile.Email/*profile.UserName*/,
                    Email = profile.Email,
                    PhoneNumber = profile.PhoneNumber,
                };
                BaseProfile prof = new BaseProfile
                {
                    Name = profile.Name,
                    LastName = profile.LastName,
                    Surname = profile.Surname,
                    Adress = profile.Adress,
                    DateOfBirth = Convert.ToDateTime(profile.DateOfBirth),
                    PassportString = profile.PassportString,
                    IdentificationCode = profile.IdentificationCode
                };
                string password = PasswordGenerator.GenerationPassword();
                if (profile.Rolename == null)
                    return false;
                await _userManager.CreateAsync(user, password);
                if (profile.Rolename.Contains("Teacher"))
                {
                    await _userManager.AddToRoleAsync(user, "Teacher");
                }
                if (profile.Rolename.Contains("Director"))
                {
                    await _userManager.AddToRoleAsync(user, "Director");
                }
                if (profile.Rolename.Contains("Curator"))
                {
                    await _userManager.AddToRoleAsync(user, "Curator");
                }
                if (profile.Rolename.Contains("DDeputy"))
                {
                    await _userManager.AddToRoleAsync(user, "DDeputy");
                }
                if (profile.Rolename.Contains("DepartmentHead"))
                {
                    await _userManager.AddToRoleAsync(user, "DepartmentHead");
                }
                if (profile.Rolename.Contains("CycleCommisionHead"))
                {
                    await _userManager.AddToRoleAsync(user, "CycleCommisionHead");
                }
                if (profile.Rolename.Contains("StudyRoomHead"))
                {
                    await _userManager.AddToRoleAsync(user, "StudyRoomHead");
                }


                prof.Id = user.Id;
                await _context.BaseProfiles.AddAsync(prof);
                await _context.SaveChangesAsync();

                await _context.TeacherProfiles.AddAsync(new TeacherProfile
                {
                    Id = prof.Id,
                    //Degree = profile.Degree 
                });
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<GetTeacherShortModel> GetCurators()
        {
            var teachers = _context.TeacherProfiles.Where(t => t.Groups.Count() == 0);
            if (teachers != null)
            {
                var us = _userManager.GetUsersInRoleAsync("Curator").Result;
                var curators = teachers.Where(t => us.Any(u => u.Id == t.Id));
                return curators.Select(t => new GetTeacherShortModel
                {
                    Id = t.Id,
                    Name = t.BaseProfile.Name + " " + t.BaseProfile.LastName + " " + t.BaseProfile.Surname
                }).ToList();
            }

            return null;
        }

        public List<DropdownModel> GetRolesInDropdownModels()
        {
            return _context.Roles.Where(t => t.Name != "Student").Select(t => new DropdownModel
            {
                Label = t.Description,
                Value = t.Name
            }).ToList();
        }

        public GetTeacherModel GetTeacherById(string id)
        {
            return _context.TeacherProfiles.Where(s => s.Id == id).Select(t => new GetTeacherModel
            {
                Id = t.Id,
                Email = t.BaseProfile.DbUser.Email,
                PhoneNumber = t.BaseProfile.DbUser.PhoneNumber,
                Name = t.BaseProfile.Name,
                LastName = t.BaseProfile.LastName,
                Surname = t.BaseProfile.Surname,
                Adress = t.BaseProfile.Adress,
                DateOfBirth = t.BaseProfile.DateOfBirth.ToString("dd.MM.yyyy"),
                Degree = t.Degree
            }).First();
        }

        public IEnumerable<GetTeacherModel> GetTeachers(string rolename)
        {
            if (String.IsNullOrEmpty(rolename))
                return _context.TeacherProfiles.Select(t => new GetTeacherModel
                {
                    Id = t.Id,
                    Email = t.BaseProfile.DbUser.Email,
                    PhoneNumber = t.BaseProfile.DbUser.PhoneNumber,
                    Name = t.BaseProfile.Name,
                    LastName = t.BaseProfile.LastName,
                    Surname = t.BaseProfile.Surname,
                    Adress = t.BaseProfile.Adress,
                    DateOfBirth = t.BaseProfile.DateOfBirth.ToString("dd.MM.yyyy"),
                    Degree = t.Degree
                });
            var users = _userManager.GetUsersInRoleAsync(rolename).Result;
            var temp= _context.BaseProfiles.Where(b=>users.Any(t=>t.Id== b.Id)).Select(t => new GetTeacherModel
            {
                Id = t.Id,
                Email = t.DbUser.Email,
                PhoneNumber = t.DbUser.PhoneNumber,
                Name = t.Name,
                LastName = t.LastName,
                Surname = t.Surname,
                Adress = t.Adress,
                DateOfBirth = t.DateOfBirth.ToString("dd.MM.yyyy"),
                Degree = t.Teacher.Degree
            }).AsNoTracking();
            return temp;
        }
    }
}

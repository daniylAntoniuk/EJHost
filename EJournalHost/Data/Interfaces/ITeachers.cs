using EJournal.Data.Entities;
using EJournal.Data.Models;
using EJournal.ViewModels;
using EJournal.ViewModels.AdminViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Interfaces
{
    public interface ITeachers
    {
        IEnumerable<GetTeacherModel> GetTeachers(string rolename="");
        GetTeacherModel GetTeacherById(string id);
        Task<bool> AddTeacherAsync(AddTeacherModel profile);
        List<DropdownModel> GetRolesInDropdownModels();
        List<GetTeacherShortModel> GetCurators();
    }
}

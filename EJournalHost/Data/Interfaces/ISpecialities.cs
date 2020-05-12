using EJournal.Data.Entities;
using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Interfaces
{
    public interface ISpecialities
    {
        IEnumerable<Speciality> GetAllSpecialities();
        List<GetSpecialityModel> GetSpecialitiesByManager(string managerId); 
    }
}

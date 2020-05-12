using EJournal.Data.EfContext;
using EJournal.Data.Entities;
using EJournal.Data.Interfaces;
using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Repositories
{
    public class SpecialityRepository : ISpecialities
    {
        private readonly EfDbContext _context;

        public SpecialityRepository(EfDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Speciality> GetAllSpecialities()
        {
            return _context.Specialities;
        }

        public List<GetSpecialityModel> GetSpecialitiesByManager(string managerId)
        {
            List<GetSpecialityModel> specialities = _context.Specialities
                .Where(x => x.TeacherId == managerId)
                .Select(s => new GetSpecialityModel
                {
                    Id = s.Id,
                    Name = s.Name
                })
                .ToList();

            return specialities;
        }

    }
}

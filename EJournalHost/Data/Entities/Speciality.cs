using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Entities
{
    public class Speciality
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TeacherId { get; set; }
        public TeacherProfile Teacher { get; set; }

        public ICollection<Group> Groups { get; set; }
    }
}

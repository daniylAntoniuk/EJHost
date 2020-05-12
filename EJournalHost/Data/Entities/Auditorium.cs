using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Entities
{
    public class Auditorium
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public string Name { get; set; }
        public ICollection<Lesson> Lessons { get; set; }
    }
}

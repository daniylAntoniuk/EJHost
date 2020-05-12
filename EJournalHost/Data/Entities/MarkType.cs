using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Entities
{
    public class MarkType
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }

        public ICollection<Mark> Marks { get; set; }
    }
}

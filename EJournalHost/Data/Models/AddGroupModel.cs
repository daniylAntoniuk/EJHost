using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Models
{
    public class AddGroupModel
    {
        public string Name { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public string TeacherId { get; set; }
        public int SpecialityId { get; set; }
    }
}

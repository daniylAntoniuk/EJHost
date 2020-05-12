using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.AdminViewModels
{
    public class EditGroupFilterModel
    {
        public string GroupName { get; set; }
        public string TeacherId { get; set; }
        public int GroupId { get; set; }
        public int SpecialityId { get; set; }
    }
}

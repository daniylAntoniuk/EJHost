using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.AdminViewModels
{
    public class AddGroupFiltersModel
    {
        public string Name { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string TeacherId { get; set; }
        public int SpecialityId { get; set; }
    }
}

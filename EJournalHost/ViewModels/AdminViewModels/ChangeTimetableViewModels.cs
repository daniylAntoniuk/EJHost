using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.AdminViewModels
{
    public class GetGroupsTimetableViewModel
    {
        public string Teacher { get; set; }
    }
    public class GetSubjectsTimetableViewModel
    {
        public string Teacher { get; set; }
        public string Group { get; set; }
    }
    public class SaveViewModel
    {
        public string Teacher { get; set; }
        public int Group { get; set; }
        public int Subject { get; set; }
        public ushort[] Numbers { get; set; }
        public int[] DaysOfWeek { get; set; }
        public int Auditory { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
    }
    public class GetAuditoriesTimetableViewModel
    {
        public ushort [] Numbers { get; set; }
        public int[] DaysOfWeek{ get; set; }
        public string Group { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
    }
}

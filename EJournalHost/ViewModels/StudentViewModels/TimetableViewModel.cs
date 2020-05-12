using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels
{
    public class TimetableViewModel
    {
        public List<TimetableModel> Timetable { get; set; }

        public string DaysInMonth { get; set; }
        public string DayOfWeek { get; set; }
        public string Month { get; set; }
    }
}

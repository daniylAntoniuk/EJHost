using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels
{
    public class HomePageViewModel
    {
        public List<MarkViewModel> Marks { get; set; }
        public List<TimetableModel> Timetable { get; set; }
        public List<string> AverageMarks { get; set; }
        public string AverageMark { get; set; }
        public string CountOfDays { get; set; }
        public string Day { get; set; }
        public string Month { get; set; }

        public string AverageMark1 { get; set; }
        public string AverageMark2 { get; set; }
        public string AverageMark3 { get; set; }
        public string AverageMark4 { get; set; }
        public string AverageMark5 { get; set; }
        public string AverageMark6 { get; set; }
    }
}

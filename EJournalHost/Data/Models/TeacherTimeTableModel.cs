using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Models
{
    public class TeacherTimeTableModel
    {
        public int LessonNumber { get; set; }
        public string LessonDate { get; set; }
        public string LessonTimeGap { get; set; }
        public int AuditoriumNumber { get; set; }
        public string SubjectName { get; set; }
        public string GroupName { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public string IsLessonBe { get; set; }
    }
}

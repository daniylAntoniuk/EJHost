using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Models
{
    public class TimetableModel
    {
        public ushort LessonNumber { get; set; }
        public string LessonDate { get; set; }
        public string LessonTimeGap { get; set; }
        public string Topic { get; set; }
        public string Day { get; set; }
        public string AuditoriumNumber { get; set; }
        public string SubjectName { get; set; }

        public string TeacherName { get; set; }
        
    }
}

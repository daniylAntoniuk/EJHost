using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Entities
{
    public class Lesson
    {
        public int Id { get; set; }
        public ushort LessonNumber { get; set; }
        public DateTime LessonDate { get; set; }
        public string LessonTimeGap { get; set; }

        public JournalColumn JournalColumn { get; set; }

        public int AuditoriumId { get; set; }
        public Auditorium Auditorium { get; set; }

        public int SubjectId { get; set; }
        public Subject Subject { get; set; }

        public string TeacherId { get; set; }
        public TeacherProfile Teacher { get; set; }

        public int GroupId { get; set; }
        public Group Group { get; set; }
    }
}
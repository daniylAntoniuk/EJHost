using EJournal.Data.Entities;
using System.Collections.Generic;

namespace EJournal.Data
{
    public class Subject
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<TeacherToSubject> TeacherToSubjects { get; set; }
        public ICollection<Lesson> Lessons { get; set; }
        public ICollection<GroupToSubject> GroupToSubjects { get; set; }
    }
}

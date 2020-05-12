using System;
using System.Collections.Generic;

namespace EJournal.Data.Entities
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime YearFrom { get; set; }
        public DateTime YearTo { get; set; }

        public string TeacherId { get; set; }
        public TeacherProfile Teacher { get; set; }

        public int SpecialityId { get; set; }
        public Speciality Speciality { get; set; }
        
        public Journal Journal { get; set; }

        public ICollection<Lesson> Lessons { get; set; }
        public ICollection<GroupNews> GroupNews { get; set; }
        public ICollection<GroupToStudent> GroupToStudents { get; set; }
        public ICollection<GroupToSubject> GroupToSubjects { get; set; }
    }
}

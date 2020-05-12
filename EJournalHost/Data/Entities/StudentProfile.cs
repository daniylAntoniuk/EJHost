using EJournal.Data.Entities.AppUeser;
using System.Collections.Generic;

namespace EJournal.Data.Entities
{
    public class StudentProfile
    {
        public string Id { get; set; }

        public BaseProfile BaseProfile { get; set; }

        public ICollection<GroupToStudent> GroupToStudents { get; set; }
        public ICollection<Mark> Marks { get; set; }
    }
}

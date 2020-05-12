using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Entities
{
    public class GroupToSubject
    {
        public int GroupId { get; set; }
        public Group Group { get; set; }

        public int SubjectId { get; set; }
        public Subject Subject { get; set; }

        public string TeacherId { get; set; }
        public TeacherProfile TeacherProfile { get; set; }
    }
}

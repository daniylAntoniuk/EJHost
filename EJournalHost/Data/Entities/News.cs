using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Entities
{
    public class News
    {
        public int Id { get; set; }
        public string Topic { get; set; }
        public string Content { get; set; }
        public DateTime DateOfCreate { get; set; }

        public string TeacherId { get; set; }
        public TeacherProfile TeacherProfile { get; set; }
    }
}

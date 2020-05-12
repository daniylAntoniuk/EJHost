using System.Collections.Generic;

namespace EJournal.Data.Entities
{
    public class JournalColumn
    {
        public int Id { get; set; }
        public string Topic { get; set; }
        public string Homework { get; set; }

        public int LessonId { get; set; }
        public virtual Lesson Lesson { get; set; }

        public int JournalId { get; set; }
        public Journal Journal { get; set; }

        public ICollection<Mark> Marks { get; set; }
    }
}

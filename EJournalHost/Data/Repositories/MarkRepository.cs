using EJournal.Data.EfContext;
using EJournal.Data.Entities;
using EJournal.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Repositories
{
    public class MarkRepository:IMarks
    {
        private readonly EfDbContext _context;
        public MarkRepository(EfDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Mark> GetMarksInGroup(int groupId, int subjectId,string date)
        {
            List<Mark> marks = new List<Mark>();
            int jourId = _context.Journals.FirstOrDefault(t => t.GroupId == groupId).Id;
            var marksCols = _context.JournalColumns.Where(t => t.JournalId == jourId && t.Lesson.SubjectId == subjectId&&t.Lesson.LessonDate==DateTime.Parse(date))
                .Select(t=>t.Marks);
            foreach (var item in marksCols)
            {
                marks.AddRange(item);
            }
            return marks;
        }

        public IEnumerable<Mark> GetStudentMarks(string studentId, int subjectId, string date)
        {
            var marks= _context.Marks.Where(t => t.StudentId == studentId);
            if (subjectId != 0)
            { 
                marks=marks.Where(t => t.JournalColumn.Lesson.SubjectId == subjectId);
            }
            else if (date != "")
            {
                marks = marks.Where(t => t.JournalColumn.Lesson.LessonDate == DateTime.Parse(date));
            }
            return marks;
        }
    }
}

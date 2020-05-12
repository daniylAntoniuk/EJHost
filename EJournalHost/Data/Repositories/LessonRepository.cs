using EJournal.Data.EfContext;
using EJournal.Data.Entities;
using EJournal.Data.Interfaces;
using EJournal.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Repositories
{
    public class LessonRepository : ILessons
    {
        private readonly EfDbContext _context;
        public LessonRepository(EfDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Lesson> GetLessonsInGroup(int groupId, string date)
        {
            if (date != "")
                return _context.Lessons.Where(t => t.GroupId == groupId && t.LessonDate == DateTime.Parse(date));

            return _context.Lessons.Where(t => t.GroupId == groupId);
        }

        public IEnumerable<GetShortSubjectModel> GetSubjects(int groupId)
        {
            if (groupId != 0)
                return _context.Subjects.Where(t => t.GroupToSubjects.Any(g => g.GroupId == groupId))
                .Select(t => new GetShortSubjectModel
                {
                    Id = t.Id,
                    Name = t.Name
                });
            else return _context.Subjects.Select(t => new GetShortSubjectModel
            {
                Id = t.Id,
                Name = t.Name
            });
        }

        public IEnumerable<Lesson> GetTeacherLessons(string teacherId, string date, int groupId)
        {
            var lessons= _context.Lessons.Where(t => t.TeacherId == teacherId);
            if (date != "")
                lessons=lessons.Where(t=>t.LessonDate.Date == DateTime.Parse(date).Date).Include(x => x.Subject).Include(x => x.Group);
            if (groupId != 0)
                lessons = lessons.Where(t => t.GroupId == groupId ).Include(x => x.Subject).Include(x => x.Group);
            return lessons;
        }
    }
}

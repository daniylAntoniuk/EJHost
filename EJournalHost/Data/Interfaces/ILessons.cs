using EJournal.Data.Entities;
using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Interfaces
{
    public interface ILessons
    {
        IEnumerable<Lesson> GetLessonsInGroup(int groupId, string date = "");
        IEnumerable<Lesson> GetTeacherLessons(string teacherId,string date="",int groupId=0);
        IEnumerable<GetShortSubjectModel> GetSubjects(int groupId=0);
    }
}

using EJournal.Data.Entities;
using System.Collections.Generic;

namespace EJournal.Data.Interfaces
{
    public interface IMarks
    {
        /// Description
        /// Return marks in journal columns format
        IEnumerable<Mark> GetMarksInGroup(int groupId,int subjectId, string date);
        IEnumerable<Mark> GetStudentMarks(string studentId,int subjectId = 0,string date="");
    }
}

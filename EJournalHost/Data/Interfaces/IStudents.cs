using EJournal.Data.Entities;
using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Interfaces
{
    public interface IStudents
    {
        IEnumerable<GetStudentModel> GetStudents(int groupId=0);
        GetStudentModel GetStudentById(string id);
        Task<bool> AddStudentAsync(AddStudentModel profile);
        IEnumerable<string> GetSpecialities();
        int GetAverageMarkStudent(string studentId, int subjectId=0);
        int CountOfTruancy(string studentId);
        IEnumerable<GetStudentModel> GetFirstTenStudents(int groupId=0);
        IEnumerable<GetStudentInfoWithGroup> GetAllStudentsBySpecialities(string teacherId);
        IEnumerable<GetStudentInfoWithGroup> GetStudentsByGroup(int groupId);
        IEnumerable<GetStudentInfoWithGroup> GetStudentsBySpeciality(int specialitId);
    }
}

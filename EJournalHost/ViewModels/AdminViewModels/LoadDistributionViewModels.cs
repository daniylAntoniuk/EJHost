using EJournal.Data;
using EJournal.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.AdminViewModels
{
    public class GetGroupsViewModel
    {
        public List<Group> Groups { get; set; }
        public List<Speciality> Specialities { get; set; }
    }
    public class FiltersModel
    {
        public int GroupId { get; set; }
    }
    public class GetSubjectViewModel
    {
        public string Group { get; set; }
        public List<SubjectsModel> Subjects { get; set; }        
    }
    public class TeacherModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
    public class SubjectsModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SelectedTeacherId { get; set; }
        public List<TeacherModel> Teachers { get; set; }
    }
    public class ChangeTeacherViewModel
    {
        public string TeacherId { get; set; }
        public string SubjectId { get; set; }
        public string GroupId { get; set; }
    }
    public class GetGroupViewModel
    {
        public string Speciality { get; set; }
    }

}

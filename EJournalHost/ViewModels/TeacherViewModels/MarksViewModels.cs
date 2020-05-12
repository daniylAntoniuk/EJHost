using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.TeacherViewModels
{
    public class GetLessonsViewModel
    {
        public string Date { get; set; }
    }
    public class GetStudentsViewModel
    {
        public string LessonId { get; set; }
    }
    public class ChangeTopicViewModel
    {
        public string LessonId { get; set; }
        public string Topic { get; set; }
    }
    public class ChangeHomeworkViewModel
    {
        public string LessonId { get; set; }
        public string Homework { get; set; }
    }
    public class ChangeMarksViewModel
    {
        public string LessonId { get; set; }
        public string Mark { get; set; }
        public string MarkType { get; set; }
        public string StudentId { get; set; }
    }
    public class ChangeIsPresentViewModel
    {
        public string LessonId { get; set; }
        public string IsPresent { get; set; }
        public string StudentId { get; set; }
    }
    public class LessonViewModel
    {
        public int Id { get; set; }
        public string Group { get; set; }
        public string LessonTimeGap { get; set; }
        public ushort LessonNumber { get; set; }
        public string Subject { get; set; }
    }
    public class StudentsViewModel
    {
        public IEnumerable<StudentViewModel> Students { get; set; }
        public string Topic { get; set; }
        public string Homework { get; set; }
    }
    public class StudentViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string LastName { get; set; }
        public string Adress { get; set; }
        public string MarkType { get; set; }
        public string DateOfBirth { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string ControlMark { get; set; }
        public string Mark { get; set; }
        public string IsPresent { get; set; }
    }
}

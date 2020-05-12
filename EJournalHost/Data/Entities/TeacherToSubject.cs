namespace EJournal.Data.Entities
{
    public class TeacherToSubject
    {
        public string TeacherId { get; set; }
        public TeacherProfile Teacher { get; set; }
        
        public int SubjectId { get; set; }
        public Subject Subject{ get; set; }
    }
}

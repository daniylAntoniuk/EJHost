using EJournal.Data.Entities.AppUeser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Entities
{
    public class BaseProfile
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string LastName { get; set; }
        public string Adress { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Image { get; set; }
        public bool IsDeducted { get; set; }
        public string PassportString { get; set; }
        public string IdentificationCode { get; set; }

        public DeductedUser DeductedUser { get; set; }
        public DbUser DbUser { get; set; }
        public TeacherProfile Teacher { get; set; }
        public StudentProfile Student { get; set; }
    }
}

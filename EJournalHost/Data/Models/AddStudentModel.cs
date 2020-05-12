using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Models
{
    public class AddStudentModel
    {
        public int GroupId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string LastName { get; set; }
        public string Adress { get; set; }
        public string DateOfBirth { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string PassportString { get; set; }
        public string IdentificationCode { get; set; }
    }
}

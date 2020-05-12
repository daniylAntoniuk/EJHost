using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Models
{
    public class GetGroupInfoModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CountOfStudents { get; set; }
        public double AverageMark { get; set; }
        public string NameOfCurator { get; set; }
    }
}

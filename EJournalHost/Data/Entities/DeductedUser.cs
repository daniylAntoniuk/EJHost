using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Entities
{
    public class DeductedUser
    {
        public int Id { get; set; }
        public string ReasonOfDeduction { get; set; }
        public DateTime DeductionDate { get; set; }

        public string DeductedUserId { get; set; }
        public BaseProfile BaseProfile { get; set; }

        public int DeductionTypeId { get; set; }
        public DeductionType DeductionType { get; set; }
    }
}

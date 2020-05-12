using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Entities
{
    public class DeductionType
    {
        public int Id { get; set; }
        public string DeductionName { get; set; }

        public ICollection<DeductedUser> DeductedUsers { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Models
{
    public class ParamsForRequest
    {
        public int Page { get; set; }
        public int GroupId { get; set; }
        public int SpecialityId { get; set; }
    }
}

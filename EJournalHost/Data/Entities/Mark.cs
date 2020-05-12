using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Entities
{
    public class Mark
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public bool IsPresent { get; set; }

        public int JournalColumnId { get; set; }
        public JournalColumn JournalColumn { get; set; }

        public int MarkTypeId { get; set; }
        public virtual MarkType MarkType { get; set; }

        public string StudentId { get; set; }
        public StudentProfile Student { get; set; }
    }
}

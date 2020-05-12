using System.Collections.Generic;

namespace EJournal.Data.Entities
{
    public class Journal
    {
        public int Id { get; set; }
        public int GroupId { get; set; }

        public Group Group { get; set; }

        public ICollection<JournalColumn> JournalColumns { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels
{
    public class MarksFilterModel
    {
        public int SubjectId { get; set; }
    }

    public class MarksTableModel
    {
        public List<string> columns { get; set; }
        public List<MarksRowModel> rows { get; set; }
    }

    public class MarksRowModel
    {
        public string Name { get; set; }
        public List<string> Marks { get; set; }
    }
}

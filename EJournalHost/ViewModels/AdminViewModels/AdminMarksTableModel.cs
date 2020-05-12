using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.AdminViewModels
{
    public class AdminMarksTableModel
    {
        public List<string> columns { get; set; }
        public List<AdminTableMarksRowModel> rows { get; set; }

    }
}

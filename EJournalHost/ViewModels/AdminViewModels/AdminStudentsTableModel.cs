using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.AdminViewModels
{
    public class AdminStudentsTableModel
    {
        public List<AdminTableColumnModel> columns { get; set; }
        public List<AdminTableStudentRowModel> rows { get; set; }

    }
}

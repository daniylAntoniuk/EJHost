using EJournal.ViewModels.AdminViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.AdminViewModels
{
    public class AdminTableMarksRowModel
    {
        public string Name { get; set; }
        public List<MarkPrintModel> Marks { get; set; }
    }
}

using EJournal.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.StudentViewModels
{
    public class HomeworkViewModel
    {
        public List<HomeworkModel> Homeworks { get; set; }
        public List<Subject> Subjects { get; set; }
    }
    public class GetHomeworkModel
    {
        public string Subject { get; set; }
        public string Date { get; set; }
    }
    public class HomeworkModel
    {
        public string Subject { get; set; }
        public string Topic { get; set; }
        public string Homework { get; set; }
        public string Teacher { get; set; }
        public string Date { get; set; }
    }
}

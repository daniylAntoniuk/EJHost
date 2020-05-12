using EJournal.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.StudentViewModels
{
    public class NewsViewModel
    {
        public List<NewsModel> News { get; set; }
    }
    public class NewsModel
    {
        public int Id { get; set; }
        public string Topic { get; set; }
        public string Content { get; set; }
        public string DateOfCreate { get; set; }
        public string Teacher { get; set; }
    }
}

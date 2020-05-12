using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Models
{
    public class NewsModel
    {
        public string TeacherId { get; set; }
        public string Topic { get; set; }
        public string Content { get; set; }
    }
    public class NewsGroupModel
    {
        public string TeacherId { get; set; }
        public string Topic { get; set; }
        public string Content { get; set; }
        public int GroupId { get; set; }
    }
}

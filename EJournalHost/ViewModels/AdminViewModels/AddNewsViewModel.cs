using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.AdminViewModels
{
    public class AddNewsViewModel
    {
        [Required]
        public string Topic { get; set; }
        [Required]
        public string Content { get; set; }
        public string Group { get; set; }
    }
    public class GetNewsViewModel
    {
        public string Group { get; set; }
    }
    public class NewsViewModel
    {
        public List<GetNewsModel> News { get; set; }
    }
    public class GetNewsModel
    {
        public int Id { get; set; }
        public string Topic { get; set; }
        public string Content { get; set; }
        public string DateOfCreate { get; set; }
        public string Teacher { get; set; }
    }
}

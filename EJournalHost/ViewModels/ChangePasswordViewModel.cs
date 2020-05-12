using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels
{
    public class ChangePasswordViewModel
    {
        [Required]
        public string ConfirmPassword { get; set; }
        [Required]
        public string Password { get; set; }

        [Required]
        public string OldPassword { get; set; }
    }
}

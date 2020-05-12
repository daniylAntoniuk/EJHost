using Microsoft.AspNetCore.Identity;

namespace EJournal.Data.Entities.AppUeser
{
    public class DbUserRole : IdentityUserRole<string> 
    {
        public virtual DbUser User { get; set; }
        public virtual DbRole Role { get; set; }
    }
}

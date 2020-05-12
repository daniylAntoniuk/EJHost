using EJournal.Data.Entities.AppUeser;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EJournal.Data.Configurations
{
    public class DbRoleConfiguration : IEntityTypeConfiguration<DbRole>
    {
        public void Configure(EntityTypeBuilder<DbRole> builder)
        {
            builder.HasMany(e => e.UserRoles)
                .WithOne(e => e.Role);
        }
    }
}

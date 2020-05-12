using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EJournal.Data.Configurations
{
    public class JournalConfiguration : IEntityTypeConfiguration<Journal>
    {
        public void Configure(EntityTypeBuilder<Journal> builder)
        {
            builder.HasOne(e => e.Group)
                .WithOne(e => e.Journal);

            builder.HasMany(e => e.JournalColumns)
                .WithOne(e => e.Journal);

            builder.HasData(
                new Journal { Id = 1, GroupId = 1 },
                new Journal { Id = 2, GroupId = 2 }
                );
        }
    }
}

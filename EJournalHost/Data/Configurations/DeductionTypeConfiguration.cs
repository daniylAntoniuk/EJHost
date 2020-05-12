using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Configurations
{
    public class DeductionTypeConfiguration : IEntityTypeConfiguration<DeductionType>
    {
        public void Configure(EntityTypeBuilder<DeductionType> builder)
        {
            builder.HasMany(e => e.DeductedUsers)
                .WithOne(e => e.DeductionType);

            builder.Property(e => e.DeductionName)
                .HasMaxLength(50)
                .IsRequired();
        }
    }
}

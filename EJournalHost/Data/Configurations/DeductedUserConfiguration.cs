using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Configurations
{
    public class DeductedUserConfiguration : IEntityTypeConfiguration<DeductedUser>
    {
        public void Configure(EntityTypeBuilder<DeductedUser> builder)
        {
            builder.HasOne(e => e.BaseProfile)
                .WithOne(e => e.DeductedUser);

            builder.HasOne(e => e.DeductionType)
                .WithMany(e => e.DeductedUsers);

            builder.Property(e => e.ReasonOfDeduction)
                .HasMaxLength(1000);

            builder.Property(e => e.DeductionTypeId)
                .IsRequired();
        }
    }
}

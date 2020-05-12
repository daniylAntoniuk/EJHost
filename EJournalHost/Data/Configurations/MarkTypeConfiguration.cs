using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Configurations
{
    public class MarkTypeConfiguration : IEntityTypeConfiguration<MarkType>
    {
        public void Configure(EntityTypeBuilder<MarkType> builder)
        {
            builder.Property(e => e.Type)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(e => e.Description)
                .IsRequired()
                .HasMaxLength(255);

            builder.HasMany(e => e.Marks)
                .WithOne(e => e.MarkType);

            builder.HasData(
                new MarkType() { Id = 1, Type = "twelve-point", Description = "For the school program" },
                new MarkType() { Id = 2, Type = "five-point", Description = "For specialty lessons and exams" });
        }
    }
}

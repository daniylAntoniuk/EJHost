using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Configurations
{
    public class MarkConfiguration : IEntityTypeConfiguration<Mark>
    {
        public void Configure(EntityTypeBuilder<Mark> builder)
        {
            builder.Property(e => e.Value)
                .IsRequired()
                .HasMaxLength(3);

            builder.Property(e => e.IsPresent)
                .IsRequired();

            builder.HasOne(e => e.JournalColumn)
                .WithMany(e => e.Marks)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.Student)
                .WithMany(e => e.Marks)
                .HasForeignKey(e => e.StudentId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

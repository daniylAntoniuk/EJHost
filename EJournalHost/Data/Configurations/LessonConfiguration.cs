using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace EJournal.Data.Configurations
{
    public class LessonConfiguration : IEntityTypeConfiguration<Lesson>
    {
        public void Configure(EntityTypeBuilder<Lesson> builder)
        { 
            builder.Property(e => e.LessonDate)
               .IsRequired();

            builder.Property(e => e.LessonNumber)
               .IsRequired();

            builder.Property(e => e.LessonTimeGap)
               .IsRequired();

            builder.HasOne(e => e.Teacher)
                .WithMany(e => e.Lessons)
                .HasForeignKey(e => e.TeacherId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.Group)
                .WithMany(e => e.Lessons)
                .HasForeignKey(e => e.GroupId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.Subject)
                .WithMany(e => e.Lessons)
                .HasForeignKey(e => e.SubjectId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.JournalColumn)
                .WithOne(e => e.Lesson);

            builder.HasOne(e => e.Auditorium)
                .WithMany(e => e.Lessons)
                .HasForeignKey(e => e.AuditoriumId);
        }
    }
}

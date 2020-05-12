using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EJournal.Data.Configurations
{
    public class JournalColumnConfiguration : IEntityTypeConfiguration<JournalColumn>
    {
        public void Configure(EntityTypeBuilder<JournalColumn> builder)
        {
            builder.Property(e => e.Topic)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(e => e.Homework)
                .HasMaxLength(200);

            builder.HasMany(e => e.Marks)
                .WithOne(e => e.JournalColumn)
                .HasForeignKey(e => e.JournalColumnId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.Lesson)
                .WithOne(e => e.JournalColumn)
                .HasForeignKey<JournalColumn>(e => e.LessonId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.Journal)
                .WithMany(e => e.JournalColumns)
                .HasForeignKey(e => e.JournalId);
        }
    }
}

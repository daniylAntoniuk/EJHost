using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EJournal.Data.Configurations
{
    public class TeaherToSubjectConfiguration : IEntityTypeConfiguration<TeacherToSubject>
    {
        public void Configure(EntityTypeBuilder<TeacherToSubject> builder)
        {
            builder.HasKey(x => new { x.SubjectId, x.TeacherId });

            builder.HasOne(e => e.Subject)
                .WithMany(e => e.TeacherToSubjects)
                .HasForeignKey(e => e.SubjectId)
                .IsRequired();

            builder.HasOne(e => e.Teacher)
                .WithMany(e => e.TeacherToSubjects)
                .HasForeignKey(e => e.TeacherId)
                .IsRequired();
        }
    }
}

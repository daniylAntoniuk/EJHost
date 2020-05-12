using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EJournal.Data.Configurations
{
    public class TeacherProfileConfiguration : IEntityTypeConfiguration<TeacherProfile>
    {
        public void Configure(EntityTypeBuilder<TeacherProfile> builder)
        {
            builder.Property(e => e.Degree)
                .HasMaxLength(256);

            builder.HasOne(e => e.BaseProfile)
                .WithOne(e => e.Teacher)
                .HasForeignKey<TeacherProfile>(e => e.Id)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(e => e.Groups)
                .WithOne(e => e.Teacher);

            builder.HasMany(e => e.TeacherToSubjects)
                .WithOne(e => e.Teacher);

            builder.HasMany(e => e.Lessons)
                .WithOne(e => e.Teacher);

            builder.HasMany(e => e.Specialities)
                .WithOne(e => e.Teacher);

            builder.HasMany(e => e.News)
                .WithOne(e => e.TeacherProfile);

            builder.HasMany(e => e.GroupToSubjects)
                .WithOne(e => e.TeacherProfile);
        }
    }
}

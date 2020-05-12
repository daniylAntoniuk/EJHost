using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EJournal.Data.Configurations
{
    public class StudentProfileConfiguration : IEntityTypeConfiguration<StudentProfile>
    {
        public void Configure(EntityTypeBuilder<StudentProfile> builder)
        {
            builder.HasOne(e => e.BaseProfile)
                .WithOne(e => e.Student)
                .HasForeignKey<StudentProfile>(e => e.Id)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(e => e.GroupToStudents)
                .WithOne(e => e.Student);
        }
    }
}

using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EJournal.Data.Configurations
{
    public class GroupConfiguration : IEntityTypeConfiguration<Group>
    {
        public void Configure(EntityTypeBuilder<Group> builder)
        {
            builder.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(64);

            builder.HasMany(e => e.GroupToStudents)
                .WithOne(e => e.Group);

            builder.HasOne(e => e.Teacher)
                .WithMany(e => e.Groups)
                .HasForeignKey(x => x.TeacherId);

            builder.HasOne(x => x.Journal)
                .WithOne(x => x.Group)
                .HasForeignKey<Journal>(x => x.GroupId);

            builder.HasMany(e => e.Lessons)
                .WithOne(e => e.Group);

            builder.HasMany(e => e.GroupToSubjects)
                .WithOne(e => e.Group);

            builder.HasMany(e => e.GroupNews)
                .WithOne(e => e.Group);

            builder.HasOne(e => e.Speciality)
                .WithMany(e => e.Groups)
                .HasForeignKey(e => e.SpecialityId)
                .IsRequired();

            builder.HasData(
                new Group { Id = 1, Name = "11-П", YearFrom = new System.DateTime (2019, 9, 1), YearTo = new System.DateTime (2023, 5, 23), SpecialityId = 1/*, TeacherId = "7fe110d7-33cc-4656-9805-60c93e5851ed" */},
                new Group { Id = 2, Name = "12-П", YearFrom = new System.DateTime (2019, 9, 1), YearTo = new System.DateTime(2023, 5, 23), SpecialityId = 1/*, TeacherId = "9dfdae6c-0554-4404-ad44-d69a1616fe01"*/ }
                );
        }
    }
}

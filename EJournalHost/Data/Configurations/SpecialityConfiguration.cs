using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace EJournal.Data.Configurations
{
    public class SpecialityConfiguration : IEntityTypeConfiguration<Speciality>
    {
        public void Configure(EntityTypeBuilder<Speciality> builder)
        {
            builder.HasMany(e => e.Groups)
                .WithOne(e => e.Speciality);

            builder.HasOne(e => e.Teacher)
                .WithMany(e => e.Specialities)
                .HasForeignKey(e => e.TeacherId);

            builder.Property(e => e.Name)
                .HasMaxLength(100)
                .IsRequired();

            builder.HasData(
                new Speciality() { Id = 1, Name = "Programming" },
                new Speciality() { Id = 2, Name = "Design" }
                );
        }
    }
}

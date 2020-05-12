using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EJournal.Data.Configurations
{
    public class AuditoriumConfiguration : IEntityTypeConfiguration<Auditorium>
    {
        public void Configure(EntityTypeBuilder<Auditorium> builder)
        {
            builder.Property(p => p.Name)
                .HasMaxLength(64);

            builder.HasMany(e => e.Lessons)
                .WithOne(e => e.Auditorium);

            builder.HasData(
                new Auditorium() { Id = 1, Number = 1, Name = " "},
                new Auditorium() { Id = 2, Number = 2, Name = " " },
                new Auditorium() { Id = 3, Number = 3, Name = " " },
                new Auditorium() { Id = 4, Number = 4, Name = " " },
                new Auditorium() { Id = 5, Number = 5, Name = " " },
                new Auditorium() { Id = 6, Number = 6, Name = " " },
                new Auditorium() { Id = 7, Number = 7, Name = " " },
                new Auditorium() { Id = 8, Number = 8, Name = " " },
                new Auditorium() { Id = 9, Number = 9, Name = " " },
                new Auditorium() { Id = 10, Number = 10, Name = " " },
                new Auditorium() { Id = 11, Number = 11, Name = " " },
                new Auditorium() { Id = 12, Number = 12, Name = " " },
                new Auditorium() { Id = 13, Number = 13, Name = " " },
                new Auditorium() { Id = 14, Number = 14, Name = " " },
                new Auditorium() { Id = 15, Number = 15, Name = " " },
                new Auditorium() { Id = 16, Number = 16, Name = " " },
                new Auditorium() { Id = 17, Number = 17, Name = " " },
                new Auditorium() { Id = 18, Number = 18, Name = " " },
                new Auditorium() { Id = 19, Number = 19, Name = " " },
                new Auditorium() { Id = 20, Number = 20, Name = " " },
                new Auditorium() { Id = 21, Number = 21, Name = " " },
                new Auditorium() { Id = 22, Number = 22, Name = " " },
                new Auditorium() { Id = 23, Number = 23, Name = " " },
                new Auditorium() { Id = 24, Number = 24, Name = " " },
                new Auditorium() { Id = 25, Number = 25, Name = " " },
                new Auditorium() { Id = 26, Number = 26, Name = " " },
                new Auditorium() { Id = 27, Number = 27, Name = " " },
                new Auditorium() { Id = 28, Number = 28, Name = " " },
                new Auditorium() { Id = 29, Number = 29, Name = " " },
                new Auditorium() { Id = 30, Number = 30, Name = " " },
                new Auditorium() { Id = 31, Number = 31, Name = " " },
                new Auditorium() { Id = 32, Number = 32, Name = " " },
                new Auditorium() { Id = 33, Number = 33, Name = " " },
                new Auditorium() { Id = 34, Number = 34, Name = " " },
                new Auditorium() { Id = 35, Number = 35, Name = " " },
                new Auditorium() { Id = 36, Number = 36, Name = " " },
                new Auditorium() { Id = 37, Number = 37, Name = " " },
                new Auditorium() { Id = 38, Number = 38, Name = " " },
                new Auditorium() { Id = 39, Number = 39, Name = " " },
                new Auditorium() { Id = 40, Number = 40, Name = " " },
                new Auditorium() { Id = 41, Number = 41, Name = " " },
                new Auditorium() { Id = 42, Number = 42, Name = " " },
                new Auditorium() { Id = 43, Number = 43, Name = " " },
                new Auditorium() { Id = 44, Number = 44, Name = " " },
                new Auditorium() { Id = 45, Number = 45, Name = " " },
                new Auditorium() { Id = 46, Number = 46, Name = " " },
                new Auditorium() { Id = 47, Number = 47, Name = " " },
                new Auditorium() { Id = 48, Number = 48, Name = " " },
                new Auditorium() { Id = 49, Number = 49, Name = " " },
                new Auditorium() { Id = 50, Number = 50, Name = " " },
                new Auditorium() { Id = 51, Number = 51, Name = " " },
                new Auditorium() { Id = 52, Number = 52, Name = " " },
                new Auditorium() { Id = 53, Number = 53, Name = " " },
                new Auditorium() { Id = 54, Number = 54, Name = " " },
                new Auditorium() { Id = 55, Number = 55, Name = " " },
                new Auditorium() { Id = 56, Number = 56, Name = " " },
                new Auditorium() { Id = 57, Number = 57, Name = " " },
                new Auditorium() { Id = 58, Number = 58, Name = " " },
                new Auditorium() { Id = 59, Number = 59, Name = " " });
        }
    }
}

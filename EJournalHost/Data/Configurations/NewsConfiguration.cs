using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Configurations
{
    public class NewsConfiguration : IEntityTypeConfiguration<News>
    {
        public void Configure(EntityTypeBuilder<News> builder)
        {
            builder.Property(e => e.Topic)
                .HasMaxLength(100);

            builder.Property(e => e.Content)
                .HasMaxLength(500);

            builder.HasOne(e => e.TeacherProfile)
                .WithMany(e => e.News)
                .HasForeignKey(e => e.TeacherId);
        }
    }
}

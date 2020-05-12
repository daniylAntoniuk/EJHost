using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace EJournal.Data.Configurations
{
    public class GroupNewsConfiguration : IEntityTypeConfiguration<GroupNews>
    {
        public void Configure(EntityTypeBuilder<GroupNews> builder)
        {
            builder.Property(e => e.Topic)
                .HasMaxLength(100);

            builder.Property(e => e.Content)
                .HasMaxLength(500);

            builder.HasOne(e => e.TeacherProfile)
                .WithMany(e => e.GroupNews)
                .HasForeignKey(e => e.TeacherId);

            builder.HasOne(e => e.Group)
                .WithMany(e => e.GroupNews)
                .HasForeignKey(e => e.GroupId);
        }
    }
}

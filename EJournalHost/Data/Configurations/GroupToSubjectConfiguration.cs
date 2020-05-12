using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Configurations
{
    public class GroupToSubjectConfiguration : IEntityTypeConfiguration<GroupToSubject>
    {
        public void Configure(EntityTypeBuilder<GroupToSubject> builder)
        {
            builder.HasKey(x => new { x.GroupId, x.SubjectId });

            builder.HasOne(e => e.Subject)
                .WithMany(e => e.GroupToSubjects)
                .HasForeignKey(e => e.SubjectId)
                .IsRequired();

            builder.HasOne(e => e.Group)
                .WithMany(e => e.GroupToSubjects)
                .HasForeignKey(e => e.GroupId)
                .IsRequired();

            builder.HasOne(e => e.TeacherProfile)
                .WithMany(e => e.GroupToSubjects)
                .HasForeignKey(e => e.TeacherId);
        }
    }
}

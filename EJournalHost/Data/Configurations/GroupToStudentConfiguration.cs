using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EJournal.Data.Configurations
{
    public class GroupToStudentConfiguration : IEntityTypeConfiguration<GroupToStudent>
    {
        public void Configure(EntityTypeBuilder<GroupToStudent> builder)
        {
            builder.HasKey(x => new { x.GroupId, x.StudentId });

            builder.HasOne(e => e.Student)
                .WithMany(e => e.GroupToStudents)
                .HasForeignKey(e => e.StudentId)
                .IsRequired();

            builder.HasOne(e => e.Group)
                .WithMany(e => e.GroupToStudents)
                .HasForeignKey(e => e.GroupId)
                .IsRequired();

            //builder.HasData(
            //    new GroupToStudent { GroupId = 1, StudentId = "02f49f23-1c6a-41dd-884c-e0c099c6ffbe" },
            //    new GroupToStudent { GroupId = 1, StudentId = "4023a5f3-887d-49e7-9a8f-2ac408403e36" },
            //    new GroupToStudent { GroupId = 1, StudentId = "4609a9ec-816d-412f-ad69-634313b98381" },
            //    new GroupToStudent { GroupId = 1, StudentId = "53eaa096-311e-4ca0-9e15-01f1b130ba47" },
            //    new GroupToStudent { GroupId = 1, StudentId = "54e88695-7933-41a0-bb15-dfa1d338ccd4" },
            //    new GroupToStudent { GroupId = 1, StudentId = "640b1fca-7ee5-495d-a6de-64ebde0ebe42" },
            //    new GroupToStudent { GroupId = 1, StudentId = "66a9d695-7b6f-4ed0-ba01-297d3bc45df2" },
            //    new GroupToStudent { GroupId = 1, StudentId = "6e9be139-7722-4870-8f7c-6d4afa97f5c6" },
            //    new GroupToStudent { GroupId = 1, StudentId = "72b9cabe-59e0-4299-b71c-a5334105288a" },
            //    new GroupToStudent { GroupId = 1, StudentId = "7ce0762d-5a5b-4e30-9490-cf36c6d72b2e" },

            //    new GroupToStudent { GroupId = 2, StudentId = "89931ee0-13bf-4258-8236-089ecec23846" },
            //    new GroupToStudent { GroupId = 2, StudentId = "89dd9cbb-fcbf-4256-9c07-e11425f09bda" },
            //    new GroupToStudent { GroupId = 2, StudentId = "8d433e43-d5b9-43bb-ac54-70020f95d019" },
            //    new GroupToStudent { GroupId = 2, StudentId = "a0c97c4d-7160-4930-8c60-d1d8a7eab92a" },
            //    new GroupToStudent { GroupId = 2, StudentId = "b931d27f-d26d-497f-b3fe-f2ff72bc801e" },
            //    new GroupToStudent { GroupId = 2, StudentId = "c2481aaa-933c-4ea8-a5d9-8b56dfc39b3c" },
            //    new GroupToStudent { GroupId = 2, StudentId = "c3f3b9c0-871a-409d-87d2-f2789b4f4f57" },
            //    new GroupToStudent { GroupId = 2, StudentId = "e1966463-ad9c-4540-b001-f7f9f9bf931a" },
            //    new GroupToStudent { GroupId = 2, StudentId = "eb98f664-df9c-4a9d-b68d-6d892de87c56" },
            //    new GroupToStudent { GroupId = 2, StudentId = "fa27d6e2-2e53-4b52-a8fb-41cedbebcb63" }

            //    );
        }
    }
}

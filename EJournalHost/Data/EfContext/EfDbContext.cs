using EJournal.Data.Configurations;
using EJournal.Data.Entities;
using EJournal.Data.Entities.AppUeser;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EJournal.Data.EfContext
{
    public class EfDbContext : IdentityDbContext<DbUser, DbRole, string, IdentityUserClaim<string>,
    DbUserRole, IdentityUserLogin<string>,
    IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public EfDbContext(DbContextOptions<EfDbContext> options)
            : base(options)
        {

        }

        public virtual DbSet<Auditorium> Auditoriums { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<GroupToStudent> GroupsToStudents { get; set; }
        public virtual DbSet<Journal> Journals { get; set; }
        public virtual DbSet<JournalColumn> JournalColumns { get; set; }
        public virtual DbSet<Lesson> Lessons { get; set; }
        public virtual DbSet<Mark> Marks { get; set; }
        public virtual DbSet<MarkType> MarkTypes { get; set; }
        public virtual DbSet<StudentProfile> StudentProfiles { get; set; }
        public virtual DbSet<Subject> Subjects { get; set; }
        public virtual DbSet<TeacherProfile> TeacherProfiles { get; set; }
        public virtual DbSet<TeacherToSubject> TeacherToSubjects { get; set; }
        public virtual DbSet<BaseProfile> BaseProfiles { get; set; }
        public virtual DbSet<Speciality> Specialities { get; set; }
        public virtual DbSet<GroupToSubject> GroupToSubjects { get; set; }
        public virtual DbSet<DeductedUser> DeductedUsers { get; set; }
        public virtual DbSet<DeductionType> DeductionTypes { get; set; }
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<GroupNews> GroupNews { get; set; }
        public virtual DbSet<LessonType> LessonTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new BaseProfileConfiguration());
            modelBuilder.ApplyConfiguration(new TeacherProfileConfiguration());
            modelBuilder.ApplyConfiguration(new StudentProfileConfiguration());
            modelBuilder.ApplyConfiguration(new DbUserRoleConfiguration());
            modelBuilder.ApplyConfiguration(new DbUserConfiguration());
            modelBuilder.ApplyConfiguration(new DbRoleConfiguration());
            modelBuilder.ApplyConfiguration(new GroupConfiguration());
            modelBuilder.ApplyConfiguration(new GroupToStudentConfiguration());
            modelBuilder.ApplyConfiguration(new SubjectConfiguration());
            modelBuilder.ApplyConfiguration(new TeaherToSubjectConfiguration());
            modelBuilder.ApplyConfiguration(new AuditoriumConfiguration());
            modelBuilder.ApplyConfiguration(new JournalConfiguration());
            modelBuilder.ApplyConfiguration(new LessonConfiguration());
            modelBuilder.ApplyConfiguration(new JournalColumnConfiguration());
            modelBuilder.ApplyConfiguration(new MarkConfiguration());
            modelBuilder.ApplyConfiguration(new MarkTypeConfiguration());
            modelBuilder.ApplyConfiguration(new SpecialityConfiguration());
            modelBuilder.ApplyConfiguration(new GroupToSubjectConfiguration());
            modelBuilder.ApplyConfiguration(new DeductedUserConfiguration());
            modelBuilder.ApplyConfiguration(new DeductionTypeConfiguration());
            modelBuilder.ApplyConfiguration(new NewsConfiguration());
            modelBuilder.ApplyConfiguration(new GroupNewsConfiguration());
            modelBuilder.ApplyConfiguration(new LessonTypeConfiguration());
        }
    }
}

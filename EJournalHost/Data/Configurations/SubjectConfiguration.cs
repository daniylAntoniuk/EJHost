using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Configurations
{
    public class SubjectConfiguration : IEntityTypeConfiguration<Subject>
    {
        public void Configure(EntityTypeBuilder<Subject> builder)
        {
            builder.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(64);

            builder.HasMany(e => e.TeacherToSubjects)
                .WithOne(e => e.Subject);

            builder.HasMany(e => e.Lessons)
                .WithOne(e => e.Subject);

            builder.HasMany(e => e.GroupToSubjects)
                .WithOne(e => e.Subject);

            builder.HasData(
                new Subject() { Id = 1, Name = "Українська мова"},
                new Subject() { Id = 2, Name = "Українська література"},
                new Subject() { Id = 3, Name = "Світова література"},
                new Subject() { Id = 4, Name = "Математика"},
                new Subject() { Id = 5, Name = "Основи інформатики" },
                new Subject() { Id = 6, Name = "Всесвітня істрія" },
                new Subject() { Id = 7, Name = "Географія" },
                new Subject() { Id = 8, Name = "Біологія" },
                new Subject() { Id = 9, Name = "Фізика" },
                new Subject() { Id = 10, Name = "Хімія" },
                new Subject() { Id = 11, Name = "Іноземна мова"},
                new Subject() { Id = 12, Name = "Фізична культура" },
                new Subject() { Id = 13, Name = "Людина і світ" },
                new Subject() { Id = 14, Name = "Громадянська освіта" },
                new Subject() { Id = 15, Name = "Астрономія" },

                new Subject() { Id = 16, Name = "Інформаційна діяльність підприємства" },
                new Subject() { Id = 17, Name = "Планування та організація виробничої діяльності підприємства" },
                new Subject() { Id = 18, Name = "Інформаційні системи і технології на підприємстві" },
                new Subject() { Id = 19, Name = "Нормативна база інформаційної діяльності підприємства" },
                new Subject() { Id = 20, Name = "Захист інформвції на підприємстві" },
                new Subject() { Id = 21, Name = "Офісні системи і електронний документообіг" },
                new Subject() { Id = 22, Name = "Інтернет - технології в інформаційній діяльності" },
                new Subject() { Id = 23, Name = "Основи алгоритмізації та програмування" },
                new Subject() { Id = 24, Name = "Електронна комерція" },
                new Subject() { Id = 25, Name = "Охорона праці" },
     
                new Subject() { Id = 26, Name = "Менеджмент та маркетинг" },
                new Subject() { Id = 27, Name = "Управління інформаційними ресурсами" },
                new Subject() { Id = 28, Name = "Інформаційний бізнес" },
                new Subject() { Id = 29, Name = "Інформаційне право" },
                new Subject() { Id = 30, Name = "Економічна кібернетика" },

                new Subject() { Id = 31, Name = "Політична економія" },
                new Subject() { Id = 32, Name = "Вища математика" },
                new Subject() { Id = 33, Name = "Інформатика і комп'ютерна техніка" },
                new Subject() { Id = 34, Name = "Економіка підприємства" },
                new Subject() { Id = 35, Name = "Фінанси підприємства" },
                new Subject() { Id = 36, Name = "Бухалтерський облік" },
                new Subject() { Id = 37, Name = "Екологія" },
                new Subject() { Id = 38, Name = "Безпека життєдіяльності" },

                new Subject() { Id = 39, Name = "Історія України" },
                new Subject() { Id = 40, Name = "Українська мова за професійним спрямуванням" },
                new Subject() { Id = 41, Name = "Культурологія" },
                new Subject() { Id = 42, Name = "Основи філософських знань" },
                new Subject() { Id = 43, Name = "Економічна теорія" },
                new Subject() { Id = 44, Name = "Основи правознавства" },
                new Subject() { Id = 45, Name = "Соціологія" },
                new Subject() { Id = 46, Name = "Іноземна мова за професійним спрямуванням" },
                new Subject() { Id = 47, Name = "Фізичне виховання" },
                new Subject() { Id = 48, Name = "Основи загальної психології" },
                new Subject() { Id = 49, Name = "Основи екології" },
                new Subject() { Id = 50, Name = "Вища математика" },
                new Subject() { Id = 51, Name = "Обчислювальне техніка та програмування" },
                new Subject() { Id = 52, Name = "Організаційна техніка" },
                new Subject() { Id = 53, Name = "Документознавство" },
                new Subject() { Id = 54, Name = "Комп'ютерна графіка" },
                new Subject() { Id = 55, Name = "Діловодство" },
                new Subject() { Id = 56, Name = "Основи менеджменту та маркетингу" },
                new Subject() { Id = 57, Name = "Діловий документ" },
                new Subject() { Id = 58, Name = "Інформаційне забезпечення управління" },
                new Subject() { Id = 59, Name = "Інформаційні системи і мережі" },
                new Subject() { Id = 60, Name = "Системне управляння базами даних" },
                new Subject() { Id = 61, Name = "Стилістика ділового мовлення" },
                new Subject() { Id = 62, Name = "Професійна етика" },
                new Subject() { Id = 63, Name = "Архівознавство" },
                new Subject() { Id = 64, Name = "Охорона праці" },
                new Subject() { Id = 65, Name = "Психологія ділового спілкування" },
                new Subject() { Id = 66, Name = "Основи роботи на ПЕОМ" },
                new Subject() { Id = 67, Name = "Лінгвістичні основи документознавства" },
                new Subject() { Id = 68, Name = "Інформаційне право" },
                new Subject() { Id = 69, Name = "Електронний документообіг" },
                new Subject() { Id = 70, Name = "Інформаційні системи і мережі" }
                );
        }
    }
}

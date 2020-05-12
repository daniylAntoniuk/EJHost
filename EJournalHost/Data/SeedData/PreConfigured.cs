using EJournal.Data.EfContext;
using EJournal.Data.Entities.AppUeser;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bogus;
using EJournal.Data.Entities;
using EJournal.Data.Models;

namespace EJournal.Data.SeedData
{
    public class PreConfigured
    {
        public static void SeedRoles(RoleManager<DbRole> roleManager)
        {
            try
            {
                if (!roleManager.Roles.Any())
                {
                    var roleName = "Director";
                    var result = roleManager.CreateAsync(new DbRole
                    {
                        Name = roleName,
                        Description="Директор"
                    }).Result;
                    roleName = "Student";
                    var result2 = roleManager.CreateAsync(new DbRole
                    {
                        Name = roleName,
                        Description="Студент"
                    }).Result;
                    roleName = "Teacher";
                    var result3 = roleManager.CreateAsync(new DbRole
                    {
                        Name = roleName,
                        Description = "Вчитель"
                    }).Result;
                    roleName = "DDeputy";
                    var result4 = roleManager.CreateAsync(new DbRole
                    {
                        Name = roleName,
                        Description = "Заступник директора"
                    }).Result;                  
                    roleName = "Curator";
                    var result5 = roleManager.CreateAsync(new DbRole
                    {
                        Name = roleName,
                        Description = "Куратор"
                    }).Result;
                    roleName = "StudyRoomHead";
                    var result6 = roleManager.CreateAsync(new DbRole
                    {
                        Name = roleName,
                        Description = "Зав. навч-метод каб."
                    }).Result;
                    roleName = "DepartmentHead";
                    var result7 = roleManager.CreateAsync(new DbRole
                    {
                        Name = roleName,
                        Description = "Зав. відділення"
                    }).Result;
                    roleName = "CycleCommisionHead";
                    var result8 = roleManager.CreateAsync(new DbRole
                    {
                        Name = roleName,
                        Description = "Голова цикл. комісії"
                    }).Result;
                }
            }
            catch (Exception)
            {

            }
        }
        public static async Task SeedUsers(UserManager<DbUser> userManager, EfDbContext context)
        {
            try
            {
                if (!context.TeacherProfiles.Any())
                {
                    DbUser user1 = new DbUser
                    {
                        UserName = "director",
                        Email = "beedirector@gmail.com",
                        PhoneNumber = "+380503334031",
                    };
                    DbUser user2 = new DbUser
                    {
                        UserName = "emdeputy",
                        Email = "emdeputyninja@gmail.com",
                        PhoneNumber = "+380505551541",
                    };
                    DbUser user3 = new DbUser
                    {
                        UserName = "edeputy",
                        Email = "neputy@gmail.com",
                        PhoneNumber = "+380453855561",
                    };
                    DbUser user4 = new DbUser
                    {
                        UserName = "srhead",
                        Email = "spickof@gmail.com",
                        PhoneNumber = "+380395554292",
                    };
                    DbUser user5 = new DbUser
                    {
                        UserName = "dhead",
                        Email = "hosihead@gmail.com",
                        PhoneNumber = "+380635554874",
                    };
                    DbUser user6 = new DbUser
                    {
                        UserName = "dhead2",
                        Email = "margihead@gmail.com",
                        PhoneNumber = "+380975254814",
                    };
                    DbUser user7 = new DbUser
                    {
                        UserName = "cchead",
                        Email = "micycle@gmail.com",
                        PhoneNumber = "+380440055588",
                    };
                    DbUser user8 = new DbUser
                    {
                        UserName = "curatorR",
                        Email = "rain2123@gmail.com",
                        PhoneNumber = "+380478125550",
                    };
                    DbUser user9 = new DbUser
                    {
                        UserName = "curatorB",
                        Email = "bolt48@gmail.com",
                        PhoneNumber = "+380236655550",
                    };
                    DbUser user10 = new DbUser
                    {
                        UserName = "curatorK",
                        Email = "dudecurator@gmail.com",
                        PhoneNumber = "+380412355550",
                    };
                    await userManager.CreateAsync(user1, "Qwerty-1");
                    await userManager.AddToRoleAsync(user1, "Director");

                    await userManager.CreateAsync(user2, "Qwerty-1");
                    await userManager.AddToRoleAsync(user2, "DDeputy");

                    await userManager.CreateAsync(user3, "Qwerty-1");
                    await userManager.AddToRoleAsync(user3, "DDeputy");

                    await userManager.CreateAsync(user4, "Qwerty-1");
                    await userManager.AddToRoleAsync(user4, "StudyRoomHead");

                    await userManager.CreateAsync(user5, "Qwerty-1");
                    await userManager.AddToRoleAsync(user5, "DepartmentHead");

                    await userManager.CreateAsync(user6, "Qwerty-1");
                    await userManager.AddToRoleAsync(user6, "DepartmentHead");

                    await userManager.CreateAsync(user7, "Qwerty-1");
                    await userManager.AddToRoleAsync(user7, "CycleCommisionHead");

                    await userManager.CreateAsync(user8, "Qwerty-1");
                    await userManager.AddToRoleAsync(user8, "Curator");

                    await userManager.CreateAsync(user9, "Qwerty-1");
                    await userManager.AddToRoleAsync(user9, "Curator");

                    await userManager.CreateAsync(user10, "Qwerty-1");
                    await userManager.AddToRoleAsync(user10, "Curator");

                    BaseProfile profile1 = new BaseProfile
                    {
                        Id = user1.Id,
                        Name = "Віктор",
                        LastName = "Дем’янюк",
                        Surname = "Володимирович",
                        Adress = "вулиця Шевченка, 45",
                        DateOfBirth = new DateTime(1983, 6, 23),
                    };
                    BaseProfile profile2 = new BaseProfile
                    {
                        Id = user2.Id,
                        Name = "Лариса",
                        LastName = "Осадча",
                        Surname = "Костянтинівна",
                        Adress = "вулиця Гранична, 58",
                        DateOfBirth = new DateTime(1983, 6, 23),
                    };
                    BaseProfile profile3 = new BaseProfile
                    {
                        Id = user3.Id,
                        Name = "Руслан",
                        LastName = "Алексіюк",
                        Surname = "Іванович",
                        Adress = "вулиця Степана Бандери, 12",
                        DateOfBirth = new DateTime(1981, 3, 5),
                    };
                    BaseProfile profile4 = new BaseProfile
                    {
                        Id = user4.Id,
                        Name = "Євген",
                        LastName = "Вокальчук",
                        Surname = "Лукашович",
                        Adress = "вулиця Княгині Ольги, 1",
                        DateOfBirth = new DateTime(1983, 6, 23),
                    };
                    BaseProfile profile5 = new BaseProfile
                    {
                        Id = user5.Id,
                        Name = "Галина",
                        LastName = "Чачіна",
                        Surname = "Сергіївна",
                        Adress = "вулиця Степана Бандери, 36-44",
                        DateOfBirth = new DateTime(1962, 2, 4),
                    };
                    BaseProfile profile6 = new BaseProfile
                    {
                        Id = user6.Id,
                        Name = "Маргарита",
                        LastName = "Володько",
                        Surname = "Володимирівна",
                        Adress = "вулиця Клима Савура, 8-14",
                        DateOfBirth = new DateTime(1983, 6, 23),
                    };
                    BaseProfile profile7 = new BaseProfile
                    {
                        Id = user7.Id,
                        Name = "Юлія",
                        LastName = "Власюк",
                        Surname = "Іллівна",
                        Adress = "вулиця Прохідна, 15-13",
                        DateOfBirth = new DateTime(1961, 7, 12),
                    };
                    BaseProfile profile8 = new BaseProfile
                    {
                        Id = user8.Id,
                        Name = "Вікторія",
                        LastName = "Рейнська",
                        Surname = "Борисівна",
                        Adress = "вулиця Павлюченка, 20",
                        DateOfBirth = new DateTime(1983, 6, 23),
                    };
                    BaseProfile profile9 = new BaseProfile
                    {
                        Id = user9.Id,
                        Name = "Інна",
                        LastName = "Кондратюк",
                        Surname = "Володимирівна",
                        Adress = "вулиця Миколи Зерова, 23-1",
                        DateOfBirth = new DateTime(1983, 6, 23),
                    };
                    BaseProfile profile10 = new BaseProfile
                    {
                        Id = user10.Id,
                        Name = "Надія",
                        LastName = "Болтенко",
                        Surname = "Євгенівна",
                        Adress = "вулиця Костромська, 1",
                        DateOfBirth = new DateTime(1983, 6, 23),
                    };
                    await context.BaseProfiles.AddRangeAsync(profile1, profile2, profile3, profile4,
                    profile5, profile6, profile7, profile8, profile9, profile10);
                    await context.SaveChangesAsync();
                    await context.TeacherProfiles.AddRangeAsync(new TeacherProfile { Id = profile1.Id, },
                        new TeacherProfile { Id = profile2.Id }, new TeacherProfile { Id = profile3.Id },
                        new TeacherProfile { Id = profile4.Id }, new TeacherProfile { Id = profile5.Id },
                        new TeacherProfile { Id = profile6.Id }, new TeacherProfile { Id = profile7.Id },
                        new TeacherProfile { Id = profile8.Id }, new TeacherProfile { Id = profile9.Id },
                        new TeacherProfile { Id = profile10.Id });
                    await context.SaveChangesAsync();
                }
                if (!context.StudentProfiles.Any())
                {
                    string[] middles =
                    {
                    "Олександрович",
                    "Валерійович",
                    "Дмитрович",
                    "Максимович",
                    "Петрович",
                    "Тарасович",
                    "Богданович",
                    "Миколайович",
                    "Олексійович",
                    "Ігорович",
                    "Іванович",
                    "В'ячеславович",
                    "Станіславович",
                    "Борисович",
                    "Вадимович",
                    "Артемович",
                    "Вікторович",
                    "Володимирович",
                    "Григорійович",
                    "Євгенович",
                    "Казимирович",
                    "Станіславович",
                    "Валентинович"
                    };
                    Faker<StudentRandomModel> studentFaked = new Faker<StudentRandomModel>("uk")
                                    .RuleFor(t => t.DateOfBirth, f => f.Date.BetweenOffset(
                                        new DateTimeOffset(DateTime.Now.AddYears(-60)),
                                        new DateTimeOffset(DateTime.Now.AddYears(-20))).DateTime)
                                    .RuleFor(t => t.Email, f => f.Person.Email)
                                    .RuleFor(t => t.UserName, f => f.Person.UserName)
                                    .RuleFor(t => t.PhoneNumber, f => f.Person.Phone)
                                    .RuleFor(t => t.Adress, f => f.Address.StreetAddress())
                                    .RuleFor(t => t.Name, f => f.Person.FirstName)
                                    .RuleFor(t => t.LastName, f => f.Person.LastName)
                                    .RuleFor(t => t.Surname, f => middles[f.Random.Int(0, middles.Length - 1)]);

                    var randoms = studentFaked.Generate(20);
                    foreach (var item in randoms)
                    {
                        DbUser stud = new DbUser
                        {
                            UserName = item.UserName,
                            Email = item.Email,
                            PhoneNumber = item.PhoneNumber,
                        };
                        await userManager.CreateAsync(stud, "Qwerty-1");
                        await userManager.AddToRoleAsync(stud, "Student");

                        BaseProfile prof = new BaseProfile
                        {
                            Id = stud.Id,
                            Name = item.Name,
                            LastName = item.LastName,
                            Surname = item.Surname,
                            Adress = item.Adress,
                            DateOfBirth = item.DateOfBirth
                        };
                        await context.BaseProfiles.AddAsync(prof);
                        await context.SaveChangesAsync();
                        await context.StudentProfiles.AddAsync(new StudentProfile { Id = prof.Id });
                        await context.SaveChangesAsync();
                    }
                }
            }
            catch (Exception ex)
            {

            }
        }
    }
}

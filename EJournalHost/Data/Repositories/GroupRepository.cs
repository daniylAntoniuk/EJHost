using EJournal.Data.EfContext;
using EJournal.Data.Entities;
using EJournal.Data.Interfaces;
using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EJournal.Data.Repositories
{
    public class GroupRepository : IGroups
    {
        private readonly EfDbContext _context;

        public GroupRepository(EfDbContext context)
        {
            _context = context;
        }

        public bool AddGroup(AddGroupModel model)
        {
            try
            {
                Group group = new Group
                {
                    Name = model.Name,
                    SpecialityId = model.SpecialityId,
                    YearTo = model.DateTo,
                    YearFrom = model.DateFrom
                };
                if (!String.IsNullOrEmpty(model.TeacherId))
                    group.TeacherId = model.TeacherId;
                _context.Groups.Add(group);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool DeleteGroup(int id)
        {
            try
            {
                var group = _context.Groups.FirstOrDefault(g => g.Id == id);
                _context.GroupToSubjects.RemoveRange(_context.GroupToSubjects.Where(t => t.GroupId == id));
                _context.GroupsToStudents.RemoveRange(_context.GroupsToStudents.Where(t => t.GroupId == id));
                _context.SaveChanges();
                _context.Groups.Remove(group);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool EditGroup(string teacherId, int groupId, string groupName)
        {
            bool changes = false;
            var group = _context.Groups.FirstOrDefault(g => g.Id == groupId);
            if (group.Name != groupName && !String.IsNullOrEmpty(groupName))
            {
                changes = true;
                group.Name = groupName;
                _context.SaveChanges();
            }
            if (group.TeacherId != teacherId && !String.IsNullOrEmpty(teacherId))
            {
                changes = true;
                group.TeacherId = teacherId;
                _context.SaveChanges();
            }
            return changes;
        }

        public List<GetGroupShortModel> GetAllGroupsInfo()
        {
            var groups = _context.Groups.Where(x => x.YearFrom.Year == DateTime.Now.Year || x.YearTo.Year == DateTime.Now.Year)
                .Select(t => new GetGroupShortModel
                {
                    Id = t.Id,
                    Name = t.Name
                }).ToList();
            return groups;
        }

        public List<GetGroupInfoModel> GetGroupInfoBySpeciality(int specialityId)
        {
            List<GetGroupInfoModel> groups = _context.Groups
                .Where(x => x.SpecialityId == specialityId && (x.YearFrom.Year == DateTime.Now.Year || x.YearTo.Year == DateTime.Now.Year))
                .Select(s => new GetGroupInfoModel
                {
                    Id = s.Id,
                    Name = s.Name,
                    CountOfStudents = s.GroupToSubjects.Count(),
                    NameOfCurator = s.Teacher.BaseProfile.LastName + " " + s.Teacher.BaseProfile.Name + " " + s.Teacher.BaseProfile.Surname
                })
                .ToList();
            foreach (var item in groups)
            {
                var marks = _context.GroupsToStudents.Where(t => t.GroupId == item.Id).SelectMany(t => t.Student.Marks);
                if (marks.Count() > 0)
                {
                    var formatted = marks.Select(m => Convert.ToInt32(m.Value));
                    double sum = formatted.Sum();
                    item.AverageMark = Math.Round(sum / marks.Count(), 1);
                }
                else item.AverageMark = 0;
            }
            return groups;
        }

        public IEnumerable<Group> GetGroups()
        {
            return _context.Groups;
        }
        public IEnumerable<Group> GetGroupsByTeacherId(string teacherId)
        {
            return _context.GroupToSubjects.Where(x=>x.TeacherId==teacherId).Select(x=>x.Group);
        }
        public List<GetGroupShortModel> GetGroupsBySpeciality(int specialityId)
        {
            List<GetGroupShortModel> groups = _context.Groups
              .Where(x => x.SpecialityId == specialityId && (x.YearFrom.Year == DateTime.Now.Year || x.YearTo.Year == DateTime.Now.Year))
              .Select(s => new GetGroupShortModel
              {
                  Id = s.Id,
                  Name = s.Name
              })
              .ToList();

            return groups;


        }
    }
}

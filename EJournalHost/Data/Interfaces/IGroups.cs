using EJournal.Data.Entities;
using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Interfaces
{
    public interface IGroups
    {
        List<GetGroupShortModel> GetGroupsBySpeciality(int specialityId);
        List<GetGroupInfoModel> GetGroupInfoBySpeciality(int specialityId);
        List<GetGroupShortModel> GetAllGroupsInfo();
        bool DeleteGroup(int id);
        bool EditGroup(string teacherId, int groupId, string groupName);
        bool AddGroup(AddGroupModel model);
        IEnumerable<Group> GetGroups();
        IEnumerable<Group> GetGroupsByTeacherId(string teacherId);
    }
}

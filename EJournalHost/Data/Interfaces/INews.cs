using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Interfaces
{
    public interface INews
    {
        void AddNews(NewsModel model);
        void AddGroupNews(NewsGroupModel model);
    }
}

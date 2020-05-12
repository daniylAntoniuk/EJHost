using EJournal.Data.EfContext;
using EJournal.Data.Entities;
using EJournal.Data.Interfaces;
using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Repositories
{
    public class NewsRepository : INews
    {
        private readonly EfDbContext _context;

        public NewsRepository(EfDbContext context)
        {
            _context = context;
        }
        public void AddGroupNews(NewsGroupModel model)
        {
            _context.GroupNews.Add(new GroupNews()
            {
                Content = model.Content,
                DateOfCreate = DateTime.Now,
                GroupId = model.GroupId,
                TeacherId = model.TeacherId,
                Topic = model.Topic
            });
            _context.SaveChanges();
        }

        public void AddNews(NewsModel model)
        {
            _context.News.Add(new News()
            {
                Content = model.Content,
                DateOfCreate = DateTime.Now,
                TeacherId = model.TeacherId,
                Topic = model.Topic
            });
            _context.SaveChanges();
        }
    }
}

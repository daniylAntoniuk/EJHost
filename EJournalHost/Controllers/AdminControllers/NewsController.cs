using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EJournal.Data.EfContext;
using EJournal.Data.Interfaces;
using EJournal.Data.Models;
using EJournal.ViewModels.AdminViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EJournal.Controllers.AdminControllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [Authorize(Roles = "Director,DDeputy")]
    public class NewsController : ControllerBase
    {
        private readonly EfDbContext _context;
        private readonly INews _newsRepo;
        public NewsController(EfDbContext context, INews newsRepo)
        {
            _context = context;
            _newsRepo = newsRepo;
        }
        [HttpPost("add-news")]
        public IActionResult AddNews([FromBody] AddNewsViewModel model)
        {
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            if (!string.IsNullOrEmpty(model.Group))
            {
                _newsRepo.AddGroupNews(new NewsGroupModel()
                {
                    Content = model.Content,
                    GroupId = int.Parse(model.Group),
                    TeacherId = userId,
                    Topic = model.Topic
                });
            }
            else
            {
                _newsRepo.AddNews(new NewsModel()
                {
                    Content = model.Content,
                    TeacherId = userId,
                    Topic = model.Topic
                });
            }
            return Ok();
        }
        [HttpGet("news")]
        public IActionResult GetNews()
        {

            var news = _context.News.OrderByDescending(x => x.DateOfCreate).Take(6);
            return Ok(new NewsViewModel()
            {
                News = news.Select(t => new GetNewsModel()
                {
                    Content = t.Content,
                    DateOfCreate = t.DateOfCreate.ToString("dd.MM.yyyy"),
                    Id = t.Id,
                    Teacher = t.TeacherProfile.BaseProfile.Name + " " + t.TeacherProfile.BaseProfile.Surname + " " + t.TeacherProfile.BaseProfile.LastName,
                    Topic = t.Topic
                }).ToList()
            });
        }
        [HttpPost("group-news")]
        public IActionResult GetGroupNews([FromBody] GetNewsViewModel model)
        {
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;
            var groupId = int.Parse(model.Group);
            var news = _context.GroupNews.Where(x => x.GroupId == groupId).OrderByDescending(x => x.DateOfCreate).Take(10);
            return Ok(new NewsViewModel()
            {
                News = news.Select(t => new GetNewsModel()
                {
                    Content = t.Content,
                    DateOfCreate = t.DateOfCreate.ToString("dd.MM.yyyy"),
                    Id = t.Id,
                    Teacher = t.TeacherProfile.BaseProfile.Name + " " + t.TeacherProfile.BaseProfile.Surname + " " + t.TeacherProfile.BaseProfile.LastName,
                    Topic = t.Topic
                }).ToList()
            });
        }
    }
}
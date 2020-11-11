using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ReactDemo.Models;

namespace ReactDemo.Controllers
{
    public class HomeController : Controller
    {
        private static readonly IList<CommentModel> _comments;

        IStorageRepository repo;
        public HomeController(IStorageRepository r)
        {
            repo = r;
        }

        static HomeController()
        {
            _comments = new List<CommentModel>
            {
                new CommentModel
                {
                    Id = 1,
                    Author = "Daniel Lo Nigro",
                    Text = "Hello ReactJS.NET World!"
                },
                new CommentModel
                {
                    Id = 2,
                    Author = "Pete Hunt",
                    Text = "This is one comment"
                },
                new CommentModel
                {
                    Id = 3,
                    Author = "Jordan Walke",
                    Text = "This is *another* comment"
                },
            };
        }

        public ActionResult Index()
        {
            return View(_comments);
        }

        [Route("comments")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public ActionResult Comments()
        {
            return Json(_comments);
        }


        [Route("comments/new")]
        [HttpPost]
        public ActionResult AddComment(CommentModel comment)
        {
            comment.Id = _comments.Count + 1;
            _comments.Add(comment);
            return Content("Success :)");
        }

        public ActionResult TechStackIndex()
        {
            return View();
        }


        [Route("techStack/new")]
        [HttpPost]
        public string generateTask([FromBody] InputTechModel inputTechs)
        {
            List<DatabaseOutputModel> records = repo.GetRecords();
            string techStack = String.Join(",", inputTechs.TechStack);
            string actor = records.Where(record => record.Type == "actors").FirstOrDefault().Value;
            string action = records.Where(record => record.Type == "actions").FirstOrDefault().Value;
            string addition = records.Where(record => record.Type == "additions").FirstOrDefault().Value;
            var result = String.Format("Using {0} implement an application allowing {1} {2} {3}.",techStack,actor,action,addition);
            if (records == null)
            { 
                HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return "An error occurred while accessing the database.";
                    }
            return result;
        }
    }
}
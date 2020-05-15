using Microsoft.EntityFrameworkCore;
using System;
namespace FakeBackend
{
    public class Blog
    {
        public int BlogId { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
    }
}
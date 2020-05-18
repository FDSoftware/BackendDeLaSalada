using Microsoft.EntityFrameworkCore;
using System;
namespace FakeBackend
{
    public class Blog
    {

        public int BlogId { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public Blog(int id, string t, string st)
        {
            SubTitle = st;
            Title = t;
            BlogId = id;
        }
        public Blog() //fallback constructor con properties get/set
        {

        }

        public bool validate()
        {
            if (Title != null && SubTitle != null) return true;
            return false;
        }
    }
}
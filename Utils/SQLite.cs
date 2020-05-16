using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace FakeBackend
{
    public class SQLite
    {
        ///SQLLLLLLLLLLLL
        public MyDbContext dbContext = new MyDbContext();
        public SQLite()
        {
            initDB();
        }

        private void initDB()
        {
            dbContext.Database.EnsureCreated();
        }
    }
}
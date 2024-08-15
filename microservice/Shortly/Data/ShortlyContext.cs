using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shortly.Models;

namespace Shortly.Data
{
    public class ShortlyContext : DbContext
    {
        public ShortlyContext(DbContextOptions<ShortlyContext> options)
            : base(options)
        {
        }

        public DbSet<Url> Urls { get; set; }
    }
}

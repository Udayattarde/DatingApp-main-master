using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRespository : IUserRespositry
    {
        private readonly DataContext _context;
        public UserRespository(DataContext context)
        {
             _context = context;
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.User.FindAsync(id);
        }
         public async Task<AppUser> GetUserByNameAsync(string name)
        {
            return await _context.User.Include(p => p.Photos).SingleOrDefaultAsync(x=>x.UserName == name);
        }
          public async Task<IEnumerable<AppUser>> GetUserAsync()
        {
            return await _context.User.Include(p => p.Photos).ToListAsync();
        }
        public void  update(AppUser user)
        {
            _context.User.Entry(user).State = EntityState.Modified;
        }
        public async Task<bool> SaveAllAsync(){
            return await _context.SaveChangesAsync() > 0;
        }
    

    }
}
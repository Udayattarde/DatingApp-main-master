using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
       public class AccountController : BaseApiController
    {
         private readonly DataContext _context;
          private readonly ITokenService _tokenService;
        public AccountController(DataContext context,ITokenService token)
        {
            _context = context;
            _tokenService = token;
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register (RegisterDTO register)
        {
            if(await userExists(register.Username.ToLower())) return BadRequest("User Already Exit");
            using var  hmac = new HMACSHA512();

            var user = new AppUser {
                UserName = register.Username.ToLower(),
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password)),
                passwordSalt  = hmac.Key

            };
            _context.User.Add(user);
             await _context.SaveChangesAsync();
             return new UserDTO{
                username = user.UserName,
                token = _tokenService.CreateService(user)
             };
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO login)
        {
            var user = await _context.User.SingleOrDefaultAsync(
                x => x.UserName == login.Username
            );

             if(user == null) return Unauthorized("Invalid User name");
             using var hmac = new HMACSHA512(user.passwordSalt);
             var compute = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

             for(int i=0;i<compute.Length;i++)
             {
                if(compute[i] != user.passwordHash[i]) return Unauthorized ("Invalid Password");
             }
             return new UserDTO{
                username = user.UserName,
                token = _tokenService.CreateService(user)
             };

        }
        private async Task<bool> userExists(string name)
        {
            return await _context.User.AnyAsync(x => x.UserName == name);
        }
        
        
        

    }
}
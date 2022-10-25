using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
   //[Authorize] 
    public class UsersController:BaseApiController
    {
        private readonly IUserRespositry _context;
          private readonly IMapper _mapper;
        public UsersController(IUserRespositry context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDTO>>> getUsers()
        {
            var user = await _context.GetUserAsync();
            var usersToReturn = _mapper.Map<IEnumerable<MemberDTO>>(user);
            return Ok (usersToReturn);

        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDTO>> getUser(string username)
        {
            var user = await _context.GetUserByNameAsync(username);
            return _mapper.Map<MemberDTO>(user);
        }

         
    }
}
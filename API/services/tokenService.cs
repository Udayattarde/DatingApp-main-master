using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using API.interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace API.services
{
   
    public class tokenService : ITokenService
    {
         private readonly SymmetricSecurityKey _key;

        public tokenService(IConfiguration config)
        {
            _key =new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }
   


       string ITokenService.CreateService(AppUser user)
        {
           var claims = new List<Claim>{
            new Claim(JwtRegisteredClaimNames.NameId,user.UserName)
           };

           var creds = new SigningCredentials(_key,SecurityAlgorithms.HmacSha512Signature);
           var tokendescriptor = new SecurityTokenDescriptor{
            Subject = new ClaimsIdentity(claims),
            Expires =  DateTime.Now.AddDays(7),
            SigningCredentials = creds
           };
           var tokenHandler = new JwtSecurityTokenHandler();
           var token = tokenHandler.CreateToken(tokendescriptor);

           return tokenHandler.WriteToken(token);
        }
    }
}
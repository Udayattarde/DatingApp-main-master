using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class PhotosDTO
    {
        public int Id { get; set; }
        public string  URL { get; set; }
        public bool IsMainPhoto { get; set; }
    }
}
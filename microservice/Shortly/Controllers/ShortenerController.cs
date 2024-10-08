﻿using Microsoft.AspNetCore.Mvc;
using Shortly.Data;
using Shortly.Models;
using Shortly.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Shortly.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // api/shortener
    public class ShortenerController : Controller
    {
        private readonly ShortlyContext _context;

        public ShortenerController(ShortlyContext context)
        {
            _context = context;
        }

        // Action to handle form submission and create shortened URL
        [HttpPost]
        public async Task<ActionResult<Url>> Shorten([FromBody] UrlRequest urlRequest)
        {
            if (urlRequest == null || string.IsNullOrEmpty(urlRequest.OriginalUrl))
                return BadRequest("The originalUrl field is required.");
            
            string shortenedUrl = "";
            if (urlRequest.CustomUrl == null || urlRequest.CustomUrl == String.Empty)
                shortenedUrl = GenerateShortUrl();
            else
                shortenedUrl = urlRequest.CustomUrl;
            
            var url = new Url { OriginalUrl = urlRequest.OriginalUrl, ShortUrl = shortenedUrl };
            _context.Urls.Add(url);
            await _context.SaveChangesAsync();

            return Ok(url);
        }

        public class UrlRequest
        {
            public string OriginalUrl { get; set; }
            public string CustomUrl { get; set; } 
        }


        // Action to redirect to original URL
        [HttpGet("{shortenedUrl}")]
        public async Task<ActionResult<Url>> RedirectToOriginal(string shortenedUrl)
        {
            var originalUrl = _context.Urls
                .Where(u => u.ShortUrl == shortenedUrl)
                .Select(u => u.OriginalUrl)
                .FirstOrDefault();

            if (originalUrl == null)
                return NotFound();

            return Redirect(originalUrl);  // Redirect to the original URL
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Url>>> GetAllUrls()
        {
            return await _context.Urls.ToListAsync();
        }

        private string GenerateShortUrl()
        {
            return Guid.NewGuid().ToString().Substring(0, 8);
        }
    }
}
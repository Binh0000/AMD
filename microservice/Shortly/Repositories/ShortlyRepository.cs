using Shortly.Models;
using Shortly.Repositories.Interfaces;
using Shortly.Data;

namespace url_shortener.Repositories
{
    public class UrlsRepository : IShortlyRepository
    {
        private ShortlyContext _context;

        public UrlsRepository(ShortlyContext context)
        {
            _context = context;
        }

        public Url CreateShortUrl(string originalURL)
        {
            Url shortener = new Url();
            shortener.CreatedAt = DateTime.UtcNow;

            // Generate random characters
            Random r = new Random();

            char[] chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".ToCharArray();
            int length = r.Next(6, 7);
            string randomString = "";
            for (int i = 0; i < length; i++)
            {
                randomString += chars[r.Next(chars.Length)];
            }

            var shortURL = $"https://short.url/{randomString}";

            _context.Urls.Add(shortener); //Add new shortened URL to DbSet
            _context.SaveChanges();

            return shortener;
        }

        public Url FindUrlsById(int id)
        {
            try
            {
                foreach (Url shortener in _context.Urls)
                {
                    if (shortener.Id == id) return shortener;
                }
            }
            catch (Exception)
            {
                return null;
            }
            return null;
        }

        public List<Url> GetAllUrls()
        {
            List<Url> urls = new List<Url>();
            foreach (var url in _context.Urls)
            {
                urls.Add(url);
            }
            return urls;
        }

        static async Task<bool> IsUrlAvailable(string url)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = await client.GetAsync(url);
                    return response.IsSuccessStatusCode;
                }
                catch (HttpRequestException)
                {
                    // Handle the exception if the request fails
                    return false;
                }
            }
        }
    }
}

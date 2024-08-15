using Shortly.Models;

namespace Shortly.Repositories.Interfaces
{
    public interface IShortlyRepository
    {
        public Url CreateShortUrl(string originalURL);
        public Url FindUrlsById(int id);
        public List<Url> GetAllUrls();

    }
}

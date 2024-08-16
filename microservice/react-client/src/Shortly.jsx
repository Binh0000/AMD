import axios from 'axios';
import { useState, useEffect } from 'react';

const Url = () => {
    const api = 'http://localhost:8888/shortener';
    const [urls, setUrls] = useState([]);
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(api);
                setUrls(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(api, { originalUrl });
            setShortenedUrl(data.shortUrl);
            setUrls([...urls, data]);
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) {
        return <div className="alert alert-danger text-center mt-4">Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h1 className="card-title text-center">URL Shortener</h1>
                            <form onSubmit={handleSubmit} className="mt-4">
                                <div className="mb-3">
                                    <label htmlFor="originalUrl" className="form-label">Enter the Original URL</label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        id="originalUrl"
                                        placeholder="https://example.com"
                                        value={originalUrl}
                                        onChange={(e) => setOriginalUrl(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Shorten URL</button>
                            </form>

                            {shortenedUrl && (
                                <div className="alert alert-success mt-3">
                                    <p className="mb-0">Shortened URL: <a href={`/${shortenedUrl}`} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a></p>
                                </div>
                            )}

                            <hr className="my-4" />

                            <h2 className="h4 text-center text-primary">Shortened URL List</h2>
                            <table className="table table-hover mt-3">
                                <thead className="table-success">
                                    <tr>
                                        <th>Original URL</th>
                                        <th>Shortened URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {urls.map((url) => (
                                        <tr key={url.id}>
                                            <td>{url.originalUrl}</td>
                                            <td><a href={url.originalUrl} target="_blank" rel="noopener noreferrer">http://localhost:5173/{url.shortUrl}</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Url;
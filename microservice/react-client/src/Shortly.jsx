import axios from 'axios'
import { useState, useEffect } from 'react'

const Url = () => {
    const api = 'http://localhost:8888/shortener';
    const [urls, setUrls] = useState([])
    const [originalUrl, setOriginalUrl] = useState('')
    const [shortenedUrl, setShortenedUrl] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(api)
                setUrls(data)
            } catch (err) {
                setError(err.message)
            }
        }

        fetchData() 
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(api, { originalUrl })
            setShortenedUrl(data.shortUrl)
            setUrls([...urls, data])
        } catch (err) {
            setError(err.message)
        }
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="container text-center">
            <form onSubmit={handleSubmit} className="mt-5">
                <div className="mb-3">
                    <label htmlFor="originalUrl" className="form-label">Original URL</label>
                    <input
                        type="url"
                        className="form-control"
                        id="originalUrl"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Shorten URL</button>
            </form>

            {shortenedUrl && (
                <div className="mt-3">
                    <p>Shortened URL: <a href={`/${shortenedUrl}`} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a></p>
                </div>
            )}

            <table className="table table-success mt-5">
                <thead>
                    <tr>
                        <th colSpan="3" className="h4 text-primary">SHORTENED URL LIST</th>
                    </tr>
                    <tr>
                        <th>Original URL</th>
                        <th>Shortened URL</th>
                    </tr>
                </thead>
                <tbody>
                    {urls.map((url) => (
                        <tr key={url.id}>
                            <td>{url.originalUrl}</td>
                            <td><a href={url.originalUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Url

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShortenedUrlHandler = () => {
    const { shortenedUrl } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading state for better UX
        setTimeout(() => {
            window.location.href = `http://localhost:8888/shortener/${shortenedUrl}`;
        }, 1000);
    }, [shortenedUrl]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            {loading && <div className="spinner-border text-primary" role="status"></div>}
        </div>
    );
};

export default ShortenedUrlHandler;
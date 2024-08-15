import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShortenedUrlHandler = () => {
    const { shortenedUrl } = useParams();

    useEffect(() => {
        window.location.href = `http://localhost:8888/shortener/${shortenedUrl}`;
    }, [shortenedUrl]);

    return <div>Redirecting...</div>;
};

export default ShortenedUrlHandler;

/*
Old code: 
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ShortenedUrlHandler = () => {
    const { shortenedUrl } = useParams();
    const [originalUrl, setOriginalUrl] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOriginalUrl = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8888/shortener/${shortenedUrl}`);
                setOriginalUrl(data.originalUrl);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchOriginalUrl();
    }, [shortenedUrl]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (originalUrl) {
        window.location.href = originalUrl; // Redirect to the original URL
        return null;
    }

    return <div>Loading...</div>;
};

export default ShortenedUrlHandler;
 */
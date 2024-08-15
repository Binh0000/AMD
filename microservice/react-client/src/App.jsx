import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Url from './Shortly';
import RedirectHandler from './RedirectHandler';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Url />} />
                <Route path="/:shortenedUrl" element={<RedirectHandler />} />
            </Routes>
        </Router>
    );
};

export default App;

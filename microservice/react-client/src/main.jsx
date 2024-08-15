import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Shortly from './Shortly'
import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div className="row">
            <div className="col">
                <App />
            </div>
        </div>
    </React.StrictMode>
)

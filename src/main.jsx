import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/noto-sans-arabic/arabic-400.css';
import '@fontsource/noto-sans-arabic/arabic-500.css';
import '@fontsource/noto-sans-arabic/arabic-600.css';
import '@fontsource/noto-sans-arabic/arabic-700.css';
import App from './App';
import './style.css';
createRoot(document.getElementById('root')).render(<App/>);

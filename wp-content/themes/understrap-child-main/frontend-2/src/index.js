import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import apiFetch from '@wordpress/api-fetch';
console.log('wp = ', wp);
wp.apiFetch( { path: '/wp/v2/posts' } ).then( ( posts ) => {
	console.log( 'posts =', posts );
} );

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

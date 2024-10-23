//import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SiteWrapper from './inc/site-wrapper/SiteWrapper';

function App() {
	const router = createBrowserRouter( [
		{
			path: '/',
			element: <div>Hello world!</div>,
		},
		{
			path: '/tester',
			element: <div>Yester</div>,
		},
	] );
	//console.log( 'apiFetch =', wp.data.select("core"));
	const query = {
		username: 'admin',
		password: '0w4P fgrI Ny5N ZjSL HVu9 KdKS'
	}
	//application password: '0w4P fgrI Ny5N ZjSL HVu9 KdKS'
	const credentials = btoa('admin:0w4P fgrI Ny5N ZjSL HVu9 KdKS');
	const headers = new Headers();
	headers.append('Authorization', 'Basic ' + credentials);
	//headers.append('X-WP-Nonce', themeData.nonce );alert(themeData.nonce);
	wp.apiFetch( { 
		path: '/wp/v2/menus',
		headers: {
			'Authorization': 'Basic ' + btoa('admin:0w4P fgrI Ny5N ZjSL HVu9 KdKSl')
		}
	} ).then( ( posts ) => {
    console.log( 'App menus =', posts );
	} );

	return (
		<div className="App">
			<SiteWrapper>
				<header className="App-header">
					<RouterProvider router={ router } />
				</header>
			</SiteWrapper>
		</div>
	);
}

export default App;

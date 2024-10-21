//import logo from './logo.svg';
//import './App.css';
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

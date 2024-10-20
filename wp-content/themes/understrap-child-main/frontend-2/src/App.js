//import logo from './logo.svg';
//import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
	const router = createBrowserRouter( [
		{
			path: '/',
			element: <div>Hello world!</div>
		},
		{			
			path: '/tester',
			element: <div>Yester</div>
		}
	] );
	return (
		<div className="App">
			<header className="App-header">
				<RouterProvider router={ router } />
			</header>
		</div>
	);
}

export default App;

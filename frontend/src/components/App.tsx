import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { IndexPage } from '../pages/IndexPage';
import { DashboardPage } from '../pages/DashboardPage';
import '../styles/styles.scss';
import { StoreReady } from './StoreReady';


export const App = () => {

	const store = configureStore({
		reducer: {
			//"toastMenu":toastMenu,
		},
	});

	return (
		<Provider store={store} >
			<StoreReady />
			<Router>
				<Routes>
					<Route path="/" element={<IndexPage />} />
					<Route path="/dashboard" element={<DashboardPage />} />
				</Routes>
			</Router>
		</Provider>
	);
}
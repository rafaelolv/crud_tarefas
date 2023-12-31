import React from 'react';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import ListaTarefas from './pages/ListaTarefas';

import './style/Global.module.css';


export default props => {

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route exact path={"/"} element={<ListaTarefas />} />
			</Routes>
		</BrowserRouter>
	)
};
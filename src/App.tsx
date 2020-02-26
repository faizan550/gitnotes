/** @format */

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/header/header';
import PublicGists from './components/publicGists/publicGists';
import SingleGist from './components/singleGistView/singleGist';
import UserProfile from './components/userProfile/userProfile';
import StarredGists from './components/starredGists/starredGists';
import DeleteUserGist from './components/DeleteUserGist/DeleteUserGist';
import CreateGist from './components/CreateOrEditGist/CreateGist';
import EditGist from './components/CreateOrEditGist/EditGist';

import './App.css';

const App: React.FC = () => {
	
	return (
		<div className='App'>
			{console.log("hello")}
			<Header />
				<Switch> 
					<Route path='/user/gists/gist/:id' exact component={DeleteUserGist}></Route>
					<Route path='/user-profile' exact component={UserProfile}></Route>
					<Route path='/starred-gists' exact component={StarredGists}></Route>
					<Route path='/gist/:params' exact component={SingleGist} />
					<Route path='/create-gist' exact component={CreateGist} />
					<Route path='/edit-gist/:id' exact component={EditGist} />
					<Route path='/home' exact component={PublicGists} />
				</Switch>
		</div>
	);
};

export default App;

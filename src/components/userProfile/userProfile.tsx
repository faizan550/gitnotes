/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { Tabs } from 'antd';
import { Button } from 'antd';

import { getLioginUserProfileInfo } from '../../utils';
import StarredGists from '../starredGists/starredGists';
import UserGists from '../UserGists/UserGists';

import './userProfile.css';

const UserProfile = (props: any) => {
	const { userInfo } = props;

	const data = getLioginUserProfileInfo(userInfo);
	const { login, avatar_url } = data;
	const { TabPane } = Tabs;

	return (
		<div className='user-profile-main-container'>
			{/* user profile secion */}
			<Paper className='user-profile-paper'>
				<div className='user-profile-container'>
					<img className='user-profile-img' src={avatar_url} />
					<h1>{login}</h1>
					<Button
						type='primary'
						href={`https://www.github.com/${login}`}
						className='githu-profile-button'>
						View Github Profile
					</Button>
				</div>
			</Paper>

			{/* user gists section */}
			<Paper className='user-gists-paper'>
				<Tabs type='card'>
					<TabPane tab='Gists' key='1'>
						<UserGists />
					</TabPane>
					<TabPane tab='Starred' key='2'>
						<StarredGists />
					</TabPane>
				</Tabs>
			</Paper>
		</div>
	);
};

const mapStateToProps = ({
	UserGistReducer: { userGists },
	loginUserInfoReducer: { userInfo },
}: any) => ({
	userGists,
	userInfo,
});

export default connect(mapStateToProps, null)(UserProfile);

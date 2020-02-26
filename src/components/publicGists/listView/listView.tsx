/** @format */

import React, { useState } from 'react';
import { Icon } from 'antd';
import { Checkbox } from 'antd';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
	starAGist,
	checkGistIsStarred,
	unStarAGist,
} from '../../../redux/actions/userGistsAction';

import '../listView/listView.css';

const ListView = (props: any) => {
	const {
		data,
		gistStarStatus,
		starAGist,
		unStarAGist,
		checkGistIsStarred,
		accessToken,
	} = props;
	const { status } = gistStarStatus;
	const history = useHistory();
	const [starId, setStarId] = useState();

	return (
		<div className='list-container'>
			<div style={{ backgroundColor: '#def5ec' }}>
				<div className='list-header-container'>
					<Checkbox className='checkbox' />
					<p></p>
					<p>Name</p>
					<p>Date</p>
					<p>Time</p>
					<p>Keyword</p>
					<p>NotebookName</p>
				</div>
			</div>
			{data.map((item: any) => {
				return [
					<div className='list-icon-container'>
						<div
							className='list-data-container'
							tabIndex={1}
							onClick={() => {
								history.push(`/gist/${item.id}`);
							}}>
							<Checkbox className='checkbox' />
							<div>
								<img src={item.avatar_url} className='profile-imge'></img>
							</div>
							<p>{item.login}</p>
							<p>{item.date}</p>
							<p>{item.time}</p>
							<p>{item.type}</p>
							<p>{item.filename}</p>
						</div>
						<div className='star'>
							{status == 204 && item.id == starId ? (
								<Icon
									type='star'
									theme='filled'
									className='icon'
									onClick={() => {
										unStarAGist(accessToken, item.id);
									}}
								/>
							) : (
								<Icon
									className='icon'
									type='star'
									onClick={() => (
										starAGist(accessToken, item.id), setStarId(item.id)
									)}
								/>
							)}
							<Icon type='fork' />
						</div>
					</div>,
				];
			})}
		</div>
	);
};

const mapStateToProps = ({
	UserGistReducer: { gistStarStatus },
	loginUserInfoReducer: { accessToken },
}: any) => ({
	gistStarStatus,
	accessToken,
});

const mapDispatchToProps = (dispatch: any) => {
	return bindActionCreators(
		{
			starAGist,
			checkGistIsStarred,
			unStarAGist,
		},
		dispatch,
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(ListView);

/** @format */

import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Icon, Spin } from 'antd';
import { bindActionCreators } from 'redux';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
	getPublicGistContent,
	checkGistWithContentExist,
	calclateTimeDiefference,
} from '../../utils';
import {
	starAGist,
	checkGistIsStarred,
	unStarAGist,
	deleteUserGist,
} from '../../redux/actions/userGistsAction';
import { getSingleGistContent } from '../../redux/actions/publicGistsAction';

import '../singleGistView/singleGist.css';

const DeleteUserGist = (props: any) => {
	const {
		deleteUserGist,
		starAGist,
		checkGistIsStarred,
		gistStarStatus,
		unStarAGist,
		getSingleGistContent,
		gistWithContent,
		accessToken,
		statuss,
	} = props;

	const { id } = useParams();
	const [gist, setGist] = useState<any>({});

	const { status } = gistStarStatus;

	const R = require('ramda');

	useEffect(() => {
		const checkGistIsPresent = checkGistWithContentExist(id, gistWithContent);
		if (R.isEmpty(checkGistIsPresent)) {
			checkGistIsStarred(accessToken, id);
			getSingleGistContent(id, accessToken);
			setGist(Object.values(gistWithContent)[gistWithContent.length - 1]);
		} else {
			setGist(Object.values(checkGistIsPresent)[checkGistIsPresent.length - 1]);
		}
	}, [gistWithContent]);
	console.log(gistWithContent);
	const {
		content,
		login,
		avatar_url,
		filename,
		description,
		created_at,
	} = getPublicGistContent(gist);

	const gistObject = {
		name: filename,
		fileContent: content,
		description: description,
	};

	return (
		<div className='single-gist-main-container'>
			{/* single gist header container */}
			{!statuss ? (
				<div>
					<div className='single-gist-header-container'>
						<div>
							<img alt=' ' className='user-img' src={avatar_url}></img>
						</div>
						<div style={{ marginLeft: '10px' }}>
							<span style={{ color: '#7DB5FF' }}>
								{login}/{filename}
							</span>
							<br />
							created {Math.round(calclateTimeDiefference(created_at)) + 1}{' '}
							hours ago
						</div>
						<div className='icon-container'>
							<Icon type='edit' className='icon' />
							<Link to={{ pathname: `/edit-gist/${id}`, state: gistObject }}>
								Edit
							</Link>
							<Icon type='delete' className='icon' />
							<Link
								to='/user-profile'
								onClick={() => deleteUserGist(accessToken, id)}>
								Delete
							</Link>
							{/* Delete */}
							{status == 204 ? (
								<Icon
									type='star'
									theme='filled'
									className='icon'
									onClick={() => {
										unStarAGist(accessToken, id);
									}}
								/>
							) : (
								<Icon
									className='icon'
									type='star'
									onClick={() => {
										starAGist(accessToken, id);
									}}
								/>
							)}
							<Link to=''>Star</Link>
							<Icon className='icon' type='fork' />
							<Link to=''>Fork</Link>
						</div>
					</div>
					{/* single gist file details container */}
					<div style={{ marginTop: 30 }}>
						<Paper>
							<h3 style={{ color: '#7DB5FF' }}>{filename}</h3>
						</Paper>
						<Paper>
							<pre className='content'>{content}</pre>
						</Paper>
					</div>
				</div>
			) : (
				<Spin className='loading-icon' tip='Loading...' />
			)}
		</div>
	);
};

const mapStateToProps = ({
	UserGistReducer: { gistStarStatus },
	loginUserInfoReducer: { accessToken },
	publicGists: { gistWithContent, statuss },
}: any) => ({
	gistStarStatus,
	gistWithContent,
	accessToken,
	statuss,
});

const mapDispatchToProps = (dispatch: any) => {
	return bindActionCreators(
		{
			starAGist,
			checkGistIsStarred,
			unStarAGist,
			deleteUserGist,
			getSingleGistContent,
		},
		dispatch,
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(DeleteUserGist);

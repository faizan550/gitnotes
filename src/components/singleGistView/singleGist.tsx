/** @format */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { Icon, Spin } from 'antd';
import { bindActionCreators } from 'redux';

import {
	starAGist,
	checkGistIsStarred,
	unStarAGist,
} from '../../redux/actions/userGistsAction';
import {
	getPublicGistContent,
	checkGistWithContentExist,
	calclateTimeDiefference,
} from '../../utils';
import { getSingleGistContent } from '../../redux/actions/publicGistsAction';

import '../singleGistView/singleGist.css';

const SingleGist = (props: any) => {
	
	const {
		id,
		starAGist,
		checkGistIsStarred,
		gistStarStatus,
		unStarAGist,
		getSingleGistContent,
		gistWithContent,
		accessToken,
		statuss,
	} = props;

	useEffect(() => {
		if (id) {
			if (R.isEmpty(isIdPresent)) {
				getSingleGistContent(id, accessToken);
				setGist(Object.values(gistWithContent)[gistWithContent.length - 1]);
			} else {
				setGist(Object.values(isIdPresent)[isIdPresent.length - 1]);
			}
		} else {
			if (R.isEmpty(isParamPresent)) {
				checkGistIsStarred(accessToken, params);
				getSingleGistContent(params, accessToken);
				setGist(Object.values(gistWithContent)[gistWithContent.length - 1]);
			} else {
				setGist(Object.values(isParamPresent)[isParamPresent.length - 1]);
			}
		}
	}, [gistWithContent]);

	const { params } = useParams();
	const [gist, setGist] = useState<any>({});

	const { status } = gistStarStatus;
	const isIdPresent = checkGistWithContentExist(id, gistWithContent);
	const isParamPresent = checkGistWithContentExist(params, gistWithContent);
	const R = require('ramda');
	console.log(gistWithContent)
	const {
		content,
		login,
		avatar_url,
		filename,
		created_at,
	} = getPublicGistContent(gist);

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
							{status == 204 ? (
								<Icon
									type='star'
									theme='filled'
									className='icon'
									onClick={() => {
										unStarAGist(accessToken, params);
									}}
								/>
							) : (
								<Icon
									className='icon'
									type='star'
									onClick={() => {
										starAGist(accessToken, params);
									}}
								/>
							)}
							Star
							<Icon className='icon' type='fork' />
							Fork
						</div>
					</div>

					<div style={{ marginTop: 30 }}>
						<Paper>
							<h3 style={{ color: '#7DB5FF' }}>{filename}</h3>
						</Paper>
						<Paper>
							{id ? (
								<pre className='conent-for-starred-gists'>
									{content.slice(0, 200)}
								</pre>
							) : (
								<pre className='content'>{content}</pre>
							)}
						</Paper>
					</div>
				</div>
			) : (
				<div>
					{params && <Spin className='loading-icon' tip='Loading...' />}
				</div>
			)}
		</div>
	);
};

const mapStateToProps = ({
	UserGistReducer: { gistStarStatus },
	publicGists: { gistWithContent, statuss },
	loginUserInfoReducer: { accessToken },
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
			getSingleGistContent,
		},
		dispatch,
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleGist);

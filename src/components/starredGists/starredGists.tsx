/** @format */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Pagination } from 'antd';

import SingleGist from '../singleGistView/singleGist';

import './starredGists.css';

const StarredGists = (props: any) => {
	const { userStarredGists } = props;

	const history = useHistory();
	const [currentPage, setCurrentPage] = useState(1);

	const numberOfItemPerPage = 2;
	const indexOfLastPost = currentPage * numberOfItemPerPage;
	const indexOfFirstPost = indexOfLastPost - numberOfItemPerPage;
	const NumberOfUserStarredGists = userStarredGists.slice(indexOfFirstPost, indexOfLastPost);

	const changePageNumber = (e: number) =>{
		setCurrentPage(e)
	}

	return (
		<div className='starred-gists-main-container'>
			{NumberOfUserStarredGists.map((item: any) => {
				return [
					<div
					className='starred-gists-paper'
					tabIndex={1}
					onClick={() => {
					history.push(`/gist/${item.id}`)}}
					>
					<SingleGist id={item.id} />
					</div>	
				];
			})}
			<div className = 'pagination'>
				<Pagination current = {currentPage} onChange = {changePageNumber} pageSize = {numberOfItemPerPage} total={userStarredGists.length}/>
			</div>
			
		</div>
	);
};

const mapStateToProps = ({ UserGistReducer: { userStarredGists , status} }: any) => ({
	userStarredGists,
	status
});

export default connect(mapStateToProps, null)(StarredGists);

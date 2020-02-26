import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Pagination, Spin } from 'antd';
import {useHistory} from 'react-router-dom';

import SingleGist from '../singleGistView/singleGist';

import './UserGists.css';

const UserGists = (props: any) => {

	const {userGists, statuss} =props;
	
  const history = useHistory();
	const [currentPage, setCurrentPage] = useState(1);

	const numberOfItemPerPage = 2;
	const indexOfLastPost = currentPage * numberOfItemPerPage;
	const indexOfFirstPost = indexOfLastPost - numberOfItemPerPage;
	const NumberOfUserGists = userGists.slice(indexOfFirstPost, indexOfLastPost);
	
	const changePageNumber = (e: number) =>{
		setCurrentPage(e)
	}

  return(
    <div className='starred-gists-main-container'>
			{NumberOfUserGists.map((item: any) => {
				return [
					<div
					className='starred-gists-paper'
					tabIndex={1}
					onClick={() => {
					history.push(`user/gists/gist/${item.id}`)}}
					>
					<SingleGist id={item.id} />
					</div>	
				];
			})}
			{!statuss ?
			<div className = 'pagination'>
				<Pagination current = {currentPage} onChange = {changePageNumber} pageSize = {numberOfItemPerPage} total={userGists.length}/>
			</div>:
			 <Spin className='Loading-icon' tip='Loading...' /> }
		</div>
  )
}

const mapStateToProps = ({
	UserGistReducer: { userGists },
	publicGists: { statuss }
}: any) => ({
	userGists,
	statuss
});

export default connect(mapStateToProps, null)(UserGists);
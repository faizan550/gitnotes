/** @format */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Pagination, Spin } from 'antd';
import { bindActionCreators } from 'redux';

import { getBasicInfoOfPublicGists } from '../../utils';
import ListView from '../publicGists/listView/listView';
import GridView from './gridView/gridView';
import { getSingleGistContent } from '../../redux/actions/publicGistsAction';

import '../publicGists/publicGists.css';

const PublicGists = (props: any) => {
	const { listOFPublicGists, statuss } = props;
	const publicgistsInfo = getBasicInfoOfPublicGists(listOFPublicGists);

	const [isListView, setIsListView] = useState(true);
	const [isGridView, setisGridView] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const indexOfLastPost = currentPage * 9;
	const indexOfFirstPost = indexOfLastPost - 9;
	const posts = publicgistsInfo.slice(indexOfFirstPost, indexOfLastPost);

	const changePageNumber = (e: number) => {
		setCurrentPage(e);
	};

	return (
		<div>
			{!statuss ? (
				<div>
					<div className='main-container'>
						<div className='list-grid-icon-container'>
							<Icon
								onClick={() => (setIsListView(true), setisGridView(false))}
								type='unordered-list'
							/>
							<Icon
								onClick={() => (setIsListView(false), setisGridView(true))}
								type='border-inner'
							/>
						</div>
					</div>
					{isListView && <ListView data={posts} />}
					{isGridView && <GridView data={posts} />}
					<div className='pagination'>
						<Pagination
							current={currentPage}
							onChange={changePageNumber}
							total={30}
						/>
					</div>
				</div>
			) : (
				<Spin className = 'loading-icon' tip='Loading...'/>
			)}
		</div>
	);
};

const mapStateToProps = ({
	publicGists: { listOFPublicGists, statuss },
}: any) => ({
	listOFPublicGists,
	statuss,
});
const mapDispatchToProps = (dispatch: any) => {
	return bindActionCreators(
		{
			getSingleGistContent,
		},
		dispatch,
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(PublicGists);

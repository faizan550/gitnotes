/** @format */

import React from 'react';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';

import { calclateTimeDiefference } from '../../../utils';

import '../gridView/gridView.css';

const GridView = (props: any) => {
	const { data } = props;
	const history = useHistory();

	return (
		<div className='grid-view-container'>
			{data.map((item: any) => {
				return [
					<Paper
						className='paper'
						onClick={() => {
							history.push(`/gist/${item.id}`);
						}}>
						<div className='content-container'>
							The action attribute defines the action to be performed when the
							form is submitted. Normally, the form data is sent to a web page
							form is submitted. Normally, the form data is sent to a web page
							on the server when the user clicks on the submit button.In the
							example above, the form data is sent to a page on the server
							called "/action_page.php".
						</div>
						<div className='profile-container'>
							<div>
								<img className='profile-img' src={item.avatar_url} />
							</div>
							<div style={{ marginTop: '20px' }}>
								<span style={{ color: 'blue' }}>
									{item.login}/{item.filename}
								</span>
								<br />
								created{' '}
								{Math.round(calclateTimeDiefference(item.created_at)) + 1} hours
								ago
								<br />
								{item.type}
							</div>
						</div>
					</Paper>,
				];
			})}
		</div>
	);
};

export default GridView;

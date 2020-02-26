/** @format */

import React, { useState } from 'react'
import GitHubLogin from 'react-github-login';
import { bindActionCreators } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { Input } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import { Popover, Menu } from 'antd';


import { loginAction } from '../../redux/actions/loginAction';
import FetchData from '../FetchDataComponent/FetchData'
import { getLioginUserProfileInfo, fetchAction } from '../../utils';

import './header.css';
import 'antd/dist/antd.css';

const Header = (props) => {

  const { loginAction, userInfo, accessToken } = props

  const loginStatus = localStorage.getItem('status');
  const data = getLioginUserProfileInfo(userInfo);
  const { Search } = Input;
  const { login, avatar_url } = data
  
  const history = useHistory();
  const [id, setId] = useState();

  const endSession = () => {
    localStorage.clear();
  }

  const onSuccess = (res) => {
    loginAction(res.code);
    history.push('/home');
  }

  const handleChange = (e) => {
    setId(e.target.value);
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to='/user-profile'>Your Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/home'>Home</Link>
      </Menu.Item>
      <Menu.Item>
        <a href={`https://www.github.com/${login}`} >
          Your Gihub Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <Link to='/create-gist'>Create Gist</Link>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => (history.push('/'), endSession())}>
          LogOut
        </a>
      </Menu.Item>
    </Menu>
  );

  const useName = (<span>Signed in as<br /> {login}</span>)
  return (
    <header className='header'>
      <FetchData />
      <div className='header-main-container'>
        <div>
          <h1 style={{ margin: "0", color: 'white' }}>EMUMBA</h1>
        </div>
        <div className="input-container">
          <Search
            placeholder="Search Notes"
            style={{ width: '350px', marginRight: '12px' }}
            onChange={handleChange}
            onSearch={() => (history.push(`/gist/${id}`))}
          />
        </div>
        <div>{(!loginStatus) ?
          <GitHubLogin
            clientId="e156de912e2446739fc7"
            onSuccess={onSuccess}
            redirectUri={"http://localhost:3000"}
            buttonText="LOGIN"
            className="githublogin"
            scope='gist'
            valid={true}
          />
          :
          <Popover content={menu} title={useName}>
            <img className='profile-imge' src={avatar_url} />
          </Popover>}</div>
      </div>
    </header>
  );
};

const mapStateToProps = ({ loginUserInfoReducer: { userInfo, loginStatus, accessToken } }) => ({
  userInfo, loginStatus, accessToken
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      loginAction,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
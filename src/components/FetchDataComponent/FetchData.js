import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loginUserInfo } from '../../redux/actions/loginAction';
import { getUserStarredGists } from '../../redux/actions/userGistsAction'
import { getPublicGists } from '../../redux/actions/publicGistsAction';
import { getUserGists } from '../../redux/actions/userGistsAction';


const FetchData = (props) => {

  const {
    userInfo,
    accessToken,
    listOFPublicGists,
    userGists,
    userStarredGists,
    loginUserInfo,
    getUserStarredGists,
    getPublicGists,
    getUserGists
  } = props;

  const R = require('ramda');
  console.log(accessToken)
  if (accessToken) {
    if (R.isEmpty(userInfo)) {
      loginUserInfo(accessToken);
    }
    else if (R.isEmpty(listOFPublicGists)) {
      getPublicGists()
    }
    else if (R.isEmpty(userGists)) {
      getUserGists(accessToken)
    }
    else if (R.isEmpty(userStarredGists)) {
      getUserStarredGists(accessToken)
    }
  }
  return (<div></div>)

};

const mapStateToProps = ({
  loginUserInfoReducer: { userInfo, accessToken },
  publicGists: { listOFPublicGists },
  UserGistReducer: { userGists, userStarredGists }
}) => ({
  userInfo, accessToken, listOFPublicGists, userGists, userStarredGists
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      loginUserInfo,
      getUserStarredGists,
      getPublicGists,
      getUserGists
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(FetchData);
import React from 'react';

export const GistHeader = (props) => {

}

const mapDispatchToProps = (dispatch) => {
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


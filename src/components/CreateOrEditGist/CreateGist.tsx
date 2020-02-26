import React, {useState} from 'react';
import { Input , Button} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {useHistory} from 'react-router-dom';

import {createUserGist} from '../../redux/actions/userGistsAction';

import './CreateOrEditGist.css';


const CreateOrEditGist = (props : any) => {

  const {accessToken, createUserGist} = props;

  const { TextArea } = Input;

  const [gistDescription, setGistDescription] = useState();
  const [fileName, setFileName] = useState();
  const [content, setContent] = useState();
  const history = useHistory();
  
  const handleChange  = (e: any) => {
    if(e.target.name == 'description'){
      setGistDescription(e.target.value)
    }
    if(e.target.name == 'filename'){
        setFileName(e.target.value)
    }
    if(e.target.name == 'content'){
        setContent(e.target.value)
    }
  }
  
  const fileObject = JSON.stringify({
    "description": gistDescription,
    "public": true,
     "files": {
       [fileName]:{
      "content": content
     }
    }
  })

  return(
    <div className = 'create-edit-gist-main-container'>
      <Input placeholder="Gist Description" name = 'description'
       onChange = {handleChange } style = {{background : '#FAFBFC'}} required/>
      <div className = 'create-edit-gist-file-details-containe'>
        <div className = 'create-gist-input-container'>
        <Input placeholder="FileName including extension" name = 'filename' onChange = {handleChange } 
        className = 'input' required/>
        </div>
        <TextArea rows={15} name = 'content' onChange = {handleChange } required/>
      </div>
      <Button onClick = {() => (createUserGist(accessToken, fileObject), history.push('/user-profile'))}>Create Gist</Button>
    </div>
  )
}

const mapStateToProps = ({ loginUserInfoReducer: { accessToken } }: any) => ({
	accessToken
});

const mapDispatchToProps = (dispatch : any) => {
  return bindActionCreators(
    {
      createUserGist
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditGist);
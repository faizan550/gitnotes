import React, {useState} from 'react';
import { Input , Button} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {  useParams, useHistory } from 'react-router-dom';

import {updateUserGist} from '../../redux/actions/userGistsAction';

import './CreateOrEditGist.css';


const EditGist = (props : any) => {

  const {accessToken, updateUserGist} = props;
  const {name, description, fileContent} = props.location.state;

  const { TextArea } = Input;

  const [gistDescription, setGistDescription] = useState(description);
  const [fileName, setFileName] = useState(name);
  const [content, setContent] = useState(fileContent);
  const {id} = useParams();
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
     "files": {
       [fileName]:{
      "content": content,
      "filename" : fileName
     }
    }
  }
)
  return(
    <div className = 'create-edit-gist-main-container'>
      <Input name = 'description' value = {gistDescription}
       onChange = {handleChange } style = {{background : '#FAFBFC'}} required/>
      <div className = 'create-edit-gist-file-details-containe'>
        <div className = 'create-gist-input-container'>
        <Input placeholder="FileName including extension" name = 'filename' value = {fileName} onChange = {handleChange } 
        className = 'input' required/>
        </div>
        <TextArea rows={15} name = 'content' value = {content} onChange = {handleChange } required/>
      </div>
      <Button onClick = {() => (updateUserGist(accessToken, fileObject, id, fileName), history.push(`/user/gists/gist/${id}`))}>Update Gist</Button>
    </div>
  )
}

const mapStateToProps = ({ loginUserInfoReducer: { accessToken } }: any) => ({
	accessToken
});

const mapDispatchToProps = (dispatch : any) => {
  return bindActionCreators(
    {
      updateUserGist
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(EditGist);
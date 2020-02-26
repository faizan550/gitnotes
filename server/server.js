const express = require('express');
var cors = require('cors')
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
require('isomorphic-fetch');
const Octokit = require("@octokit/rest");
const octokit = new Octokit();

const CLIENT_ID = "e156de912e2446739fc7";
const CLIENT_SECRET = "63f06b95e0151d183b62c7c351339fdc786005c0"

//get public gists
app.get('/api/public-gists', (req, res) => {
  fetch("https://api.github.com/gists/public?client_id=e156de912e2446739fc7&client_secret=63f06b95e0151d183b62c7c351339fdc786005c0")
    .then(r => r.json()).then(result => res.send(result))
    .catch(err => console.log(err))
})

// get access token
app.get('/api/getaccesstoken/:code', (req, response) => {
  octokit.request('POST https://github.com/login/oauth/access_token', {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: req.params.code,
    headers: {
      accept: "application/json"
    }
  }).then(res => response.send(res))
});

//get login user info
app.get('/api/user-info/:token', (req, res) => {
  fetch(`https://api.github.com/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${req.params.token}`
    }
  }).then(res => res.json()).then(result => res.send(result))
})

app.get('/api/content/:id/:token', (req, res) => {
  console.log(req.params.id)
  fetch(`https://api.github.com/gists/${req.params.id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${req.params.token}`
    }
  }).then(response => response.json())
    .then(result => res.send(result)).catch(error => console.log("error"))
})

//star a single gist
app.put('/api/:gist_id/:token/star', (req, res) => {
  console.log(req.body)
  console.log("check")
  fetch(`https://api.github.com/gists/${req.params.gist_id}/star`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${req.params.token}`,
      accept: "application/json",
      'Content-Length': 0
    }
  }).then(response => response).then(staredGistStatus => {
    fetch(`https://api.github.com/gists/${req.params.gist_id}`)
      .then(response => response.json())
      .then(staredGist => res.send({ staredGist, staredGistStatus }))
  }).catch(error => res.send(error))
})

//get login user gists
app.get('/api/user/gists/:token', (req, res) => {
  fetch(`https://api.github.com/gists`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${req.params.token}`
    }
  }).then(response => response.json()).then(result => res.send(result))
});

//get login user starred gists

app.get('/api/gists/starred/:token', (req, res) => {
  fetch(`https://api.github.com/gists/starred`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${req.params.token}`
    }
  }).then(response => response.json()).then(result => res.send(result))
})

//check gist is starred or not
app.get('/api/:id/:token/starred', (req, res) => {
  fetch(`https://api.github.com/gists/${req.params.id}/star`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${req.params.token}`
    }
  }).then(response => response).then(result => res.send(result))
})

//unstar a gist 
app.delete('/api/:id/:token/unstar', (req, res) => {
  fetch(`https://api.github.com/gists/${req.params.id}/star`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${req.params.token}`
    }
  }).then(response => response).then(result => res.send({ id: req.params.id }))
})

//delete user gists
app.delete('/api/:id/:token/delete', (req, res) => {
  fetch(`https://api.github.com/gists/${req.params.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${req.params.token}`
    }
  }).then(response => response).then(result => res.send({ deletedGistId: req.params.id, sta: result }))
})

//create user gist
app.post('/api/create/:token/:obj', (req, res) => {
  fetch('https://api.github.com/gists', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${req.params.token}`
    },
    body: req.params.obj
  }).then(response => response.json()).then(result => res.send(result))
})

//update userGist
app.patch('/api/update/:token/:obj/:id/:filename', (req, res) => {
  console.log(req.body)
  fileName = req.params.filename;
  fetch(`https://api.github.com/gists/${req.params.id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${req.params.token}`
    },
    body: req.params.obj
  }).then(response => response.json()).then(result => res.send({ result, fileName }))
})

app.listen(4000, () => console.log('sadas'));
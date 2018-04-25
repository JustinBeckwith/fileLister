'use strict';

const {google} = require('googleapis');
const path = require('path');
const express = require('express');

const app = express()
app.get('/', async (req, res) => {
  const {data} = await getFiles();
  res.json(data);
});
app.listen(3000, () => {
  console.log('Listening on port 3000.');
});

async function getFiles () {
  const client = await google.auth.getClient({
    keyFile: path.join(__dirname, 'keys.json'),
    scopes: 'https://www.googleapis.com/auth/drive.readonly'
  });
  const drive = google.drive({
    version: 'v2',
    auth: client
  });
  return drive.files.list();
}


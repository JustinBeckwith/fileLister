'use strict';

const {google} = require('googleapis');
const path = require('path');
const express = require('express');
const fs = require('fs');

const app = express()
app.get('/', async (req, res) => {
  const {data} = await getFiles();
  res.json(data);
});
app.listen(3000, () => {
  console.log('Listening on port 3000.');
});

function getCredentials() {
  const filePath = path.join(__dirname, 'keys.json');
  if (fs.existsSync(filePath)) {
    return require(filePath);
  }
  if (process.env.CREDENTIALS) {
    return JSON.parse(process.env.CREDENTIALS);
  }
  throw new Error('Unable to load credentials');
}

async function getFiles () {
  const credentials = getCredentials();
  const client = await google.auth.getClient({
    credentials,
    scopes: 'https://www.googleapis.com/auth/drive.readonly'
  });
  const drive = google.drive({
    version: 'v2',
    auth: client
  });
  return drive.files.list();
}

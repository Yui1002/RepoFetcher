const express = require('express');
const dotenv = require('dotenv').config();
const getReposByUsername = require('../helper/helper.js');
const db = require('../database/index.js');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', async (req, res) => {
  var username = req.body.username;

  try {
    var repos = await getReposByUsername.getReposByUsername(username);
    if (repos.length === 0) {
      // The repo doesn't exist in GitHub API
      res.status(500).send('This username does not exist in GitHub API');
    }

    var repoList = await Promise.all(
      repos.map(async (repo) => {
        var user = await db.save(repo);
        return user;
      })
    );

    res.send(repoList);

  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.getTop25Repos()
    .then(top25repos => {
      res.send(top25repos);
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
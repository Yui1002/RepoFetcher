const axios = require('axios');
const dotenv = require('dotenv').config();

let getReposByUsername = async (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.API_TOKEN}`
    }
  };

  var res = await axios(options);
  return res.data;
};

module.exports.getReposByUsername = getReposByUsername;
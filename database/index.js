const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/githubFetcher', { useNewUrlParser: true, useUnifiedTopology: true });

const repoSchema = new mongoose.Schema({
  id: Number,
  username: String,
  repo_name: String,
  repo_url: String,
  forks: Number
});

// create a model
const RepoModel = mongoose.model('Repo', repoSchema);

const checkDuplicate = function(item) {
  return RepoModel.find({ id: item.id })
    .then(result => {
      return result.length === 0 ? false : true;
    })
    .catch(err => {
      return err;
    });
}

const sortRepos = function(repos) {
  return repos.sort((a, b) => {
    return b.forks - a.forks;
  });
}

const save = async (item) => {
  try {
    let isDuplicated = await checkDuplicate(item);

    if (!isDuplicated) {
      var newRepo = new RepoModel({
        id: item.id,
        username: item.owner.login,
        repo_name: item.name,
        repo_url: item.html_url,
        forks: item.forks
      });

      var saveUser = await newRepo.save();
      return saveUser;
    }
  } catch (err) {
    return err;
  }
};

const getTop25Repos = function() {
  const maxRepos = 25;
  let top25Repos = [];

  return RepoModel.find()
    .then(result => {
      sortRepos(result);

      if (result.length < maxRepos) {
        return result;
      } else {
        result.forEach((item, index) => {
          if (index > maxRepos - 1) {
            return;
          }
          top25Repos.push(item);
        });
        return top25Repos;
      }
    })
    .catch(err => {
      return err;
    });
}


module.exports.save = save;
module.exports.getTop25Repos = getTop25Repos;


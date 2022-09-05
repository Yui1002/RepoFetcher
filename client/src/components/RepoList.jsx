import React from 'react';
import Repo from './Repo.jsx';

const styles = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '22px',
  textDecoration: 'underline',
}

const RepoList = (props) => {
  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      <div style={styles}>
        <div className="username">Username</div>
        <div className="repoName">Repo name</div>
        <div className="forks">Forks counts</div>
      </div>
      <div>
        {props.repos.map(repo => <Repo key={repo.id} repo={repo} />)}
      </div>
    </div>
  )
}

export default RepoList;


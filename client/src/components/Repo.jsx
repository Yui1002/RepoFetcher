import React from 'react';

const styles = {
  display: 'flex',
  justifyContent: 'space-between'
}

const Repo = (props) => {
  return (
    <div style={styles}>
      <div className="username">{props.repo.username}</div>
      <a href={props.repo.repo_url}>{props.repo.repo_name}</a>
      <div className="forks">{props.repo.forks}</div>
    </div>
  )
}

export default Repo;
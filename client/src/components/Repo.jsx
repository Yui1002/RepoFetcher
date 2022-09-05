import React from 'react';

const styles = {
  display: 'flex',
  justifyContent: 'space-between'
}

class Repo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles}>
        <div className="username">{this.props.repo.username}</div>
        <a href={this.props.repo.repo_url}>{this.props.repo.repo_name}</a>
        <div className="forks">{this.props.repo.forks}</div>
      </div>
    )
  }
}

export default Repo;
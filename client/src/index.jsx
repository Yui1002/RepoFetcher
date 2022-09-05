import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
  }

  async componentDidMount() {
    const response = await fetch('/repos');
    const data = await response.json();
    this.setState({
      repos: data
    });
  }

  async search (term) {
    const data = {'username': term};
    const option = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const saveResponse = await fetch('/repos', option);
    const saveData = await saveResponse.json();

    const top25Response = await fetch('/repos');
    const top25Data = await top25Response.json();

    this.setState({
      repos: top25Data
    });
  }

  applyCSS() {
    const styles = {
      margin: '20px 200px'
    }

    return styles;
  }

  render () {
    return (
    <div style={this.applyCSS()}>
      <h1>Repo Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
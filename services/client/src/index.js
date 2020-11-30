import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import axios from 'axios';
import UsersList from './components/UsersList';
import AddUser from './components/AddUser';

// nuevo
class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      username: '', 
      email: '',    
    };
    this.addUser = this.addUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  componentDidMount() {
    this.getUsers();
  };

  getUsers() {
    axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
    .then((res) => { this.setState({ users: res.data.data.users }); })
    .catch((err) => { console.log(err); });
  };

  handleChange (event) { 
  const obj = {}; 
  obj [event.target.name] = event.target.value; 
  this.setState (obj); 
  };

  addUser(event) {
  event.preventDefault();
   // new
  const data = {
    username: this.state.username,
    email: this.state.email
  };
  // new
  axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
  .then((res) => {
    this.getUsers();
    this.setState({ username: '', email: '' });
  })
  .catch((err) => { console.log(err); });
  };


  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
	    <div className="column is-half">  {/* new */}
              <br/>
              <h1 className="title is-1">All Users</h1>
              <hr/><br/>
	      <AddUser 
	        username={this.state.username} 
	        email={this.state.email}
                addUser={this.addUser}
	        handleChange={this.handleChange}
	      />
              <br/><br/>  {/* nuevo */}
	      <UsersList users={this.state.users}/>
	    </div>
          </div>
        </div>
      </section>
    )
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

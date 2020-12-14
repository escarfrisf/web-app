import React, { Component } from 'react';
import axios from 'axios';

import { Route, Switch } from 'react-router-dom';
import UsersList from './components/UsersList';
import AddUser from './components/AddUser';
import About from './components/About';
import NavBar from './components/NavBar';
import Form from './components/Form';


class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      username: '',
      email: '',
      title: 'mywebsite.io',
      // new
      formData: {
        username: '',
        email: '',
        password: ''
      },
    };
    this.addUser = this.addUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  };
  componentDidMount() {
    this.getUsers();
  };
  getUsers() {
    axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
    .then((res) => { this.setState({ users: res.data.data.users }); })
    .catch((err) => { console.log(err); });
   // .catch((err) => { console.log(this.state.formData); });
  };
  addUser(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email
    };
    axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
    .then((res) => {
      this.getUsers();
      this.setState({ username: '', email: '' });
    })
    .catch((err) => { console.log(err); });
  };
  handleChange(event) {
    const obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };
  handleUserFormSubmit(event) {
  event.preventDefault();
  const formType = window.location.href.split('/').reverse()[0];
  let data = {
    email: this.state.formData.email,
    password: this.state.formData.password,
  };
  if (formType === 'register') {
    data.username = this.state.formData.username;
  }
  const url = `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/${formType}`
  axios.post(url, data)
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => { console.log(err); });
  };
  handleFormChange(event) {
  const obj = this.state.formData;
  obj[event.target.name] = event.target.value;
  this.setState(obj);
  };
  render() {
    return (
      <div>
        <NavBar title={this.state.title} />
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-half">
                <br/>
                {/* new */}
                <Switch>
	          <Route exact path='/register' render={() => (
                    <Form
                      formType={'Register'}
                      formData={this.state.formData}
		      handleUserFormSubmit={this.handleUserFormSubmit}
		      handleFormChange={this.handleFormChange} // nuevo
                    />
                  )} />
                  <Route exact path='/login' render={() => (
                    <Form
                      formType={'Login'}
                      formData={this.state.formData}
		      handleUserFormSubmit={this.handleUserFormSubmit}
		      handleFormChange={this.handleFormChange} // nuevo
                    />
                  )} />
                  <Route exact path='/' render={() => (
                    <div>
                      <h1 className="title is-1">All Users</h1>
                      <hr/><br/>
                      <AddUser
                        username={this.state.username}
                        email={this.state.email}
                        addUser={this.addUser}
                        handleChange={this.handleChange}
                      />
                      <br/><br/>
                      <UsersList users={this.state.users}/>
                    </div>
                  )} />
                 <Route exact path='/about' component={About}/>
               </Switch>
             </div>
           </div>
         </div>
       </section>
     </div>
    )
  }
};

export default App;

import React, { Component } from "react";
import axios from "axios";

export default class User extends Component {
  constructor(props) {
    super(props);

    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      type: "",
      email: "",
      password: "",
    };
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const item = {
      type: this.state.type,
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:5000/users/add", item)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Creating New User</h3>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Type</label>
            <select
              required
              value={this.state.type}
              onChange={this.onChangeType}
            >
              <option>User</option>
              <option>Stuff</option>
            </select>
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              required
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="text"
              required
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>

          <div>
            <input type="submit" value="Add New User" />
          </div>
        </form>
      </div>
    );
  }
}

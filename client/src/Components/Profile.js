import React, { Component } from "react";
import jwt_decode from "jwt-decode";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: ""
    };
  }

  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push("/");
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email
    });
  }

  render() {
    return (
      <div className="container">
        <br></br>
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center">Halo {this.state.first_name}</h1>
        </div>
        <table className="table col-md-6 mx-auto">
          <tbody>
            <tr>
              <td>First Name</td>
              <td>{this.state.first_name}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{this.state.last_name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{this.state.email}</td>
            </tr>
          </tbody>
        </table>
        <div class="text-center">
          <div
            class="btn-group btn-md text-center"
            role="group"
            aria-label="Basic example"
          >
            <a
              class="btn btn-secondary align-center text-center"
              href="/homeuser"
              role="button"
            >
              Home
            </a>

            <a
              onClick={this.logOut.bind(this)}
              class="btn btn-secondary "
              href="/"
              role="button"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;

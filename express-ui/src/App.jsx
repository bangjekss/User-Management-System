import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Header } from './componentdb';
import { Page, RegisterPage, LoginPage, ForgotPasswordPage, ChangePasswordPage } from './pagedb';
import { keepLoginAction } from './redux/action';
import { connect } from 'react-redux';
import { notification, socket } from './favordb';

class App extends Component {
  state = {};
  componentDidMount() {
    const { keepLoginAction } = this.props;
    const token = localStorage.getItem('token');
    if (token) {
      keepLoginAction();
    }
  }

  render() {
    return (
      <div>
        <Route path="/" exact component={Page} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/change-password" component={ChangePasswordPage} />
      </div>
    );
  }
}

export default connect(null, { keepLoginAction })(App);

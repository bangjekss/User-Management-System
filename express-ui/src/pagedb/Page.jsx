import React, { Component } from 'react';
import { LoginForm, RegisForm } from '../componentdb';
import { ea } from '../spritedb';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { registerAction } from '../redux/action';

class Page extends Component {
  state = {
    isOpen_login: false,
    isOpen_register: true,
    userLog: {
      username: '',
      email: '',
      password: '',
      cpassword: '',
    },
  };
  handleRegisOpen = () => {
    this.setState({
      isOpen_register: !this.state.isOpen_register,
      isOpen_login: !this.state.isOpen_login,
    });
  };
  handleLoginOpen = () => {
    this.setState({
      isOpen_login: !this.state.isOpen_login,
      isOpen_register: !this.state.isOpen_register,
    });
  };
  handleLoginBtn = () => {
    const { username_email, password } = this.state.loginLog;
    const { loginAction } = this.props;
    if (username_email !== '' || password !== '') {
      return loginAction(this.state.loginLog);
    } else {
      return Swal.fire({
        title: 'Ooppss..!!',
        icon: 'error',
        text: 'The fields must be filled out',
        timeout: 5000,
        timerProgressBar: true,
      });
    }
  };
  handleInput = (e) => {
    this.setState({
      userLog: {
        ...this.state.userLog,
        [e.target.id]: e.target.value,
      },
    });
  };
  handleRoleRadionBtn = (e) => {
    this.setState({
      userLog: {
        ...this.state.userLog,
        roleID: parseInt(e.target.value),
      },
    });
  };
  handleSignUpBtn = () => {
    const { rxIsValidEmail, rxIsValidPassword, rxIsValidCPassword, rxIsValidUsername } = this.props; // reducer
    const { registerAction } = this.props; // action
    const { username, email, password, cpassword } = this.state.userLog;
    if (username !== '' || email !== '' || password !== '' || cpassword !== '') {
      if (rxIsValidEmail && rxIsValidPassword && rxIsValidCPassword && rxIsValidUsername) {
        registerAction(this.state.userLog);
        // return this.state.userLog;
      } else {
        return Swal.fire({
          title: 'Ooppss..!!',
          icon: 'error',
          text: 'Make sure the fields you filled are correct',
          timeout: 5000,
          timerProgressBar: true,
        });
      }
    } else {
      return Swal.fire({
        title: 'Ooppss..!!',
        icon: 'error',
        text: 'The fields must be filled',
        timeout: 5000,
        timerProgressBar: true,
      });
    }
  };

  render() {
    const { isOpen_login, isOpen_register, userLog } = this.state;
    if (isOpen_login) {
      return (
        <div
          className="d-flex align-items-center"
          style={{
            minHeight: '100vh',
            background: `url(${ea}) no-repeat center rgba(241, 253, 255,1)`,
            minHeight: '100vh',
            width: '100%',
            margin: '0',
          }}
        >
          <LoginForm
            handleInput={this.handleInput}
            handleLoginBtn={this.handleLoginBtn}
            handleLoginOpen={this.handleLoginOpen}
            isOpen_login={isOpen_login}
          />
          <div className="col-9" style={{ padding: '0' }}>
            <div></div>
          </div>
        </div>
      );
    }
    return (
      <div
        className="d-flex align-items-center"
        style={{
          minHeight: '100vh',
          background: `url(${ea}) no-repeat center rgba(241, 253, 255,1)`,
          minHeight: '100vh',
          width: '100%',
          margin: '0',
        }}
      >
        <div className="col-9" style={{ padding: '0' }}></div>
        <RegisForm
          handleInput={this.handleInput}
          handleSignUpBtn={this.handleSignUpBtn}
          valueMail={userLog.email}
          valuePassword={userLog.password}
          valueCPassword={userLog.cpassword}
          valueUsername={userLog.username}
          handleRegisOpen={this.handleRegisOpen}
          isOpen_register={isOpen_register}
        />
      </div>
    );

    /* <FormRegis
      className="col-3"
      // handleRoleRadionBtn={this.handleRoleRadionBtn}
      // selected={userLog.roleID}
    /> */
    // const { userLog } = this.state;
    // const { rxUsername } = this.props;
    // if (rxUsername) {
    //   return <Redirect to="/" />;
    // }
    // return (
    // );
  }
}

const mapStateToProps = ({ userReducer, registerReducer }) => {
  return {
    rxIsLoading: userReducer.isLoading,
    rxUsername: userReducer.username,
    rxIsValidUsername: registerReducer.isValidUsername,
    rxIsValidEmail: registerReducer.isValidEmail,
    rxIsValidPassword: registerReducer.isValidPassword,
    rxIsValidCPassword: registerReducer.isValidCPassword,
  };
};

export default connect(mapStateToProps, { registerAction })(Page);

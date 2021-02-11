import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import { logoYuchaseFull, plane } from '../spritedb';
import { validationChangePassword, changePasswordAction } from '../redux/action';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';

class ChangePasswordPage extends Component {
  state = {
    logInfo: {
      password: '',
      cpassword: '',
    },
    success: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const { validationChangePassword } = this.props;
    const { password, cpassword } = this.state.logInfo;
    const value = {
      password,
      cpassword,
    };
    if (prevState.logInfo !== this.state.logInfo) {
      validationChangePassword(value);
    }
  }
  handleInputOnChange = (e) => {
    this.setState({
      logInfo: {
        ...this.state.logInfo,
        [e.target.id]: e.target.value,
      },
    });
  };
  handleSendBtn = () => {
    const { rxIsValidPassword, rxIsValidCPassword } = this.props;
    const token = new URLSearchParams(this.props.location.search).get('token');
    const data = {
      token,
      password: this.state.logInfo.password,
    };
    const { changePasswordAction } = this.props;
    if ((rxIsValidPassword, rxIsValidCPassword)) {
      changePasswordAction(data);
    }
  };
  render() {
    const { password, cpassword } = this.state.logInfo;
    let {
      rxIsLoading,
      rxIsValidPassword,
      rxIsInvalidPassword,
      rxIsValidCPassword,
      rxIsInvalidCPassword,
    } = this.props;
    if (password.length < 1) rxIsInvalidPassword = false;
    if (cpassword.length < 1) rxIsInvalidCPassword = false;
    const classPassword = 'p-4' + (rxIsInvalidPassword ? ' is-invalid' : '');
    const classCPassword = 'p-4' + (rxIsInvalidCPassword ? ' is-invalid' : '');
    return (
      <div
        style={{
          backgroundColor: 'rgba(255, 202, 17)',
          minHeight: '100vh',
          width: '100%',
          margin: 0,
        }}
        className="d-flex justify-content-center p-5"
      >
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255)',
            minHeight: '400px',
            minWidth: '700px',
            // maxHeight: '600px',
            maxWidth: '700px',
            borderRadius: '50px',
            boxShadow: '0 1px 10px 5px rgba(0,0,0,0.1)',
          }}
          className="p-5"
        >
          <div className="d-flex justify-content-center mb-4">
            <img src={logoYuchaseFull} alt="file_err" width="450px" height="100px" />
          </div>
          <div className="d-flex justify-content-center">
            <div
              style={{
                backgroundColor: 'rgba(255, 202, 17)',
                // minHeight: '400px',
                minWidth: '600px',
                // maxHeight: '300px',
                maxWidth: '600px',
                borderRadius: '50px',
                boxShadow: '0 1px 10px 5px rgba(0,0,0,0.1)',
              }}
            >
              <div className="p-5">
                <div
                  className="d-flex justify-content-center flex-column text-muted"
                  style={{ textAlign: 'center' }}
                >
                  <h1 className="text-primary mb-5">Create New Password</h1>
                  <div className="mb-5">
                    <div className="mb-3">
                      <Input
                        valid={rxIsValidPassword}
                        placeholder="new password"
                        type="password"
                        onChange={this.handleInputOnChange}
                        id="password"
                        className={classPassword}
                        style={{ borderRadius: '50px' }}
                      />
                      <Fade bottom collapse when={rxIsInvalidPassword}>
                        <div
                          className="invalid-feedback"
                          style={{ display: 'block', textAlign: 'left' }}
                        >
                          ** Password must include At least one digit, one uppercase, one special
                          character, and 8-16 character
                        </div>
                      </Fade>
                    </div>
                    <div>
                      <Input
                        valid={rxIsValidCPassword}
                        placeholder="confirm password"
                        type="password"
                        onChange={this.handleInputOnChange}
                        id="cpassword"
                        className={classCPassword}
                        style={{ borderRadius: '50px' }}
                      />
                      <Fade bottom collapse when={rxIsInvalidCPassword}>
                        <div
                          className="invalid-feedback"
                          style={{ display: 'block', textAlign: 'left' }}
                        >
                          ** Password doesn't match
                        </div>
                      </Fade>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <Link to="/" className="mx-2">
                      <Button
                        color="warning"
                        style={{ borderRadius: '10px', height: '100%' }}
                        className="px-4"
                      >
                        <b>Login</b>
                      </Button>
                    </Link>
                    <Button
                      color="primary"
                      className="d-flex align-items-center"
                      style={{ borderRadius: '10px' }}
                      onClick={this.handleSendBtn}
                      disabled={rxIsLoading}
                    >
                      {rxIsLoading ? (
                        <Loader type="ThreeDots" width="80px" height="10px" color="white" />
                      ) : (
                        <div>
                          <img src={plane} alt="file_err" width="30px" height="30px" />
                          <b className="ml-3">Send</b>
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ userReducer, registerReducer }) => {
  return {
    rxIsLoading: userReducer.isLoading,
    rxIsValidPassword: registerReducer.isValidPassword,
    rxIsInvalidPassword: registerReducer.isInvalidPassword,
    rxIsValidCPassword: registerReducer.isValidCPassword,
    rxIsInvalidCPassword: registerReducer.isInvalidCPassword,
  };
};

export default connect(mapStateToProps, { validationChangePassword, changePasswordAction })(
  ChangePasswordPage
);

import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import { logoYuchaseFull, plane } from '../spritedb';
import { sendChangePasswordAction } from '../redux/action';
import { connect } from 'react-redux';

class ForgotPasswordPage extends Component {
  state = {
    user: '',
  };
  render() {
    const { rxIsLoading } = this.props;
    const { sendChangePasswordAction } = this.props;
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
                minWidth: '600px',
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
                  <h1 className="text-primary">Forgot Your Password</h1>
                  <div className="my-3">
                    <Link>
                      <h5 className="text-muted">Forgot your email or username?</h5>
                    </Link>
                  </div>
                  <div className="mb-4" style={{ textAlign: 'left' }}>
                    ** Please enter your email address or username. You will receive a link to
                    create a new password via email.
                  </div>
                  <div className="mb-4">
                    <Input
                      onChange={(e) => this.setState({ user: e.target.value })}
                      placeholder="email address or username"
                      className="p-4"
                      style={{ borderRadius: '50px' }}
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button
                      color="primary"
                      className="d-flex align-items-center"
                      style={{ borderRadius: '10px' }}
                      onClick={() => sendChangePasswordAction(this.state.user)}
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
const mapStateToProps = ({ userReducer }) => {
  return {
    rxIsLoading: userReducer.isLoading,
  };
};

export default connect(mapStateToProps, { sendChangePasswordAction })(ForgotPasswordPage);

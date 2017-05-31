import React, {Component} from 'react';
import './style.css';
import {NavLink} from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Navbar from '../navbar/index';
import {Provider, connect} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Control, Errors, Form, combineForms, actions} from 'react-redux-form';
var thunk = require('redux-thunk').default
import thunkMiddleware from 'redux-thunk';
import reduxLogger from 'redux-logger';

const initialUserState = {
  email: '',
  password: ''
};

const store = createStore(combineForms({user: initialUserState}), applyMiddleware(thunkMiddleware, reduxLogger));

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {dispatch} = store;
    const user = store.getState().user;

    var email = $('#input_email').val();
    var password = $('#input_password').val();

    axios.post('http://localhost:9000/signin', {
      email: email,
      password: password
    }).then(function(response) {
      if (response.status = 200) {
        console.log(response);
        alert("Masuk ke akun berhasil!");
        window.location.href = '/dashboard';
      } else {
        console.log(response);
        alert("Data tidak cocok!");
      }

    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    const getUserClassName = field => {
      const userForm = store.getState().forms.user;
      const isTouched = userForm[field].touched;
      const isValid = userForm[field].valid;

      return `form-control${isTouched || this.props.submitFailed
        ? ' active'
        : ''}${ !isValid
          ? ' invalid'
          : ''}`;
    };

    const MyTextInput = props => {
      const [,
        name] = props.name.split('.');
      const className = getUserClassName(name);

      return <input className={className} autoComplete="off" {...props}/>;
    };

    const showErrors = field => {
      const form = store.getState().forms.user.$form;

      return !field.pristine || form.submitFailed;
    };

    return (
      <Form model="user">
        <div className="form-group">
          <label>Email</label>
          <Control.text id="input_email" model=".email" component={MyTextInput} validators={{
            required: val => val && val.length,
            validEmail: window.validator.isEmail
          }}/>
          <Errors className="errors" model="user.email" show={showErrors} messages={{
            required: 'Email is required. ',
            validEmail: 'Email should be a valid email address.'
          }}/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <Control type="password" id="input_password" model=".password" component={MyTextInput} validators={{
            required: val => val && val.length,
            length: val => val.length == 0 || val.length > 4
          }}/>
          <Errors className="errors" model="user.password" show={showErrors} messages={{
            required: 'Password is required. ',
            length: 'Password should be longer than 4 chars.'
          }}/>
        </div>
        <button onClick={this.handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </Form>
    );
  }
}

const BasicForm = connect(state => {
  const {submitFailed} = state.forms.user.$form;

  return {submitFailed};
})(UserForm);

class Signin extends Component {

  render() {
    return (
      <div className="login">
        <Navbar/>
        <div className="row">
          <div className="col-md-6 col-sm-6 col-xs-12">
            <div className="login-banner">
              <div className="login-banner-title">Gabung Sekarang di CCC!</div>
              <div className="login-banner-subtitle">Tingkatkan skillmu di Code Course Camp. Perbanyak peluang untuk mengejar cita-citamu!</div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-12">
            <div className="login-form">
              <div className="login-form-title">Masuk Akun</div>
              <div className="row">
                <div className="col-md-5 col-sm-5 col-xs-7">
                  <div className="login-form-subtitle">Belum punya akun?</div>
                </div>
                <div className="col-md-7 col-sm-7 col-xs-5">
                  <NavLink className="login-form-subtitle" id="login-text" to="/auth">Daftar</NavLink>
                </div>
              </div>
              <Provider store={store}>
                <BasicForm/>
              </Provider>
              <div className="error-content">
                <ul className="err-area"></ul>
              </div>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Signin;

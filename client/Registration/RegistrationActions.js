import request from 'superagent';
import { push } from 'react-router-redux';

export const attemptRegistration = (form) => {
  return function ( dispatch ) {
    return request.post('/createAccount')
      .set('Content-Type', 'application/json')
      .send(form)
      .then(res => {
        console.log('successful registration ', res.body);
        dispatch(successfulRegistrationSubmit());
        dispatch(loginUser(res.body));
        dispatch(push('/user'));
      })
      .catch(res => {
        dispatch(errorRegistration(res.err.message));
        console.log(`ERR: ${res.err}`);
      });
  };
};

export const checkUniqueUsername = username => {
  return function ( dispatch ) {
    return new Promise((resolve, reject) => {
      request.post('/checkUsername')
        .set('Content-Type', 'application/json')
        .send({ username })
        .then(res => {
          if(res.body.username){
            reject({ username: 'That username is taken' });
          }else{
            resolve();
          }
        })
        .catch(res => {
          reject();
          console.log('err: ', res.err);
        });
    });
  }
}

export const successfulRegistration = () => {
    return {
      type: 'SUCCESSFUL_REGISTRATION'
    }
}

export const errorRegistration = ( message ) => {
    return {
      type: 'ERROR_REGISTRATION',
      message
    }
}

export const loginUser = ({ username, _id }) => {
  return {
    type: "LOG_IN",
    user: {
      username,
      userid: _id
    }
  }
};

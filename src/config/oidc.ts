/* eslint-disable */
import Oidc from 'oidc-client';
import { message } from 'ant-design-vue';
import { api } from './api';
const { PASSPORTAPI, PASSPORTAPICLIENTID, PASSPORTAPISCOPE } = api;

var mgr = new Oidc.UserManager({
  userStore: new Oidc.WebStorageStateStore({}),
  authority: PASSPORTAPI,
  client_id: PASSPORTAPICLIENTID,
  redirect_uri: window.location.origin + '/callback.html',
  response_type: 'code',
  scope: PASSPORTAPISCOPE,
  post_logout_redirect_uri: window.location.origin + '/', // window.location.origin + '/',
  silent_redirect_uri: window.location.origin + '/silent-renew.html',
  accessTokenExpiringNotificationTime: 60,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  revokeAccessTokenOnSignout: true,
  loadUserInfo: true,
});

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

mgr.events.addUserLoaded(function (user: { access_token: any }) {
  console.log(user);
  console.log('time:', new Date());
  console.log('New User Loaded：', arguments);
  console.log('Acess_token: ', user.access_token);
});

mgr.events.addAccessTokenExpiring(function () {
  console.log('AccessToken Expiring：', arguments);
});

mgr.events.addAccessTokenExpired(function () {
  console.log('AccessToken Expired：', arguments);
  // alert('Session expired. Going out!');
  setTimeout(function () {
    message.warning('登录失效，请重新登陆');
  }, 2000);
  mgr
    .signoutRedirect()
    .then(function (resp: any) {
      console.log('signed out', resp);
    })
    .catch(function (err: any) {
      console.log(err);
    });
});

mgr.events.addSilentRenewError(function () {
  console.error('Silent Renew Error：', arguments);
});

mgr.events.addUserSignedOut(function () {
  message.warning('登录失效，请重新登陆');
  // alert('Going out!');
  console.log('UserSignedOut：', arguments);
  mgr
    .signoutRedirect()
    .then(function (resp: any) {
      console.log('signed out', resp);
    })
    .catch(function (err: any) {
      console.log(err);
    });
});

export default class SecurityService {
  // Renew the token manually
  renewToken() {
    let self = this;
    return new Promise((resolve, reject) => {
      mgr
        .signinSilent()
        .then(function (user: unknown) {
          if (user == null) {
            self.signIn();
          } else {
            return resolve(user);
          }
        })
        .catch(function (err: any) {
          console.log(err);
          return reject(err);
        });
    });
  }

  // Get the user who is logged in
  getUser() {
    let self = this;
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function (user: unknown) {
          if (user == null) {
            self.signIn();
            return resolve(null);
          } else {
            return resolve(user);
          }
        })
        .catch(function (err: any) {
          console.log(err);
          return reject(err);
        });
    });
  }

  // Check if there is any user logged in
  getSignedIn() {
    let self = this;
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function (user: any) {
          if (user == null) {
            self.signIn();
            return resolve(false);
          } else {
            return resolve(true);
          }
        })
        .catch(function (err: any) {
          console.log(err);
          return reject(err);
        });
    });
  }

  // Redirect of the current window to the authorization endpoint.
  signIn() {
    mgr.signinRedirect().catch(function (err: any) {
      console.log(err);
    });
  }

  // Redirect of the current window to the end session endpoint
  signOut() {
    mgr
      .signoutRedirect()
      .then(function (resp: any) {
        console.log('signed out', resp);
      })
      .catch(function (err: any) {
        console.log(err);
      });
  }

  // Get the profile of the user logged in
  getProfile() {
    let self = this;
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function (user: { profile: unknown } | null) {
          if (user == null) {
            self.signIn();
            return resolve(null);
          } else {
            return resolve(user.profile);
          }
        })
        .catch(function (err: any) {
          console.log(err);
          return reject(err);
        });
    });
  }

  // Get the token id
  getIdToken() {
    let self = this;
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function (user: { id_token: unknown } | null) {
          if (user == null) {
            self.signIn();
            return resolve(null);
          } else {
            return resolve(user.id_token);
          }
        })
        .catch(function (err: any) {
          console.log(err);
          return reject(err);
        });
    });
  }

  // Get the session state
  getSessionState() {
    let self = this;
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function (user: any) {
          if (user == null) {
            self.signIn();
            return resolve(null);
          } else {
            return resolve(user.session_state);
          }
        })
        .catch(function (err: any) {
          console.log(err);
          return reject(err);
        });
    });
  }

  // Get the access token of the logged in user
  getAcessToken() {
    let self = this;
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function (user: { access_token: unknown } | null) {
          if (user == null) {
            self.signIn();
            return resolve(null);
          } else {
            return resolve(user.access_token);
          }
        })
        .catch(function (err: any) {
          console.log(err);
          return reject(err);
        });
    });
  }

  // Takes the scopes of the logged in user
  getScopes() {
    let self = this;
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function (user: { scopes: unknown } | null) {
          if (user == null) {
            self.signIn();
            return resolve(null);
          } else {
            return resolve(user.scopes);
          }
        })
        .catch(function (err: any) {
          console.log(err);
          return reject(err);
        });
    });
  }

  // Get the user roles logged in
  getRole() {
    let self = this;
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function (user: any) {
          if (user == null) {
            self.signIn();
            return resolve(null);
          } else {
            return resolve(user.profile.role);
          }
        })
        .catch(function (err: any) {
          console.log(err);
          return reject(err);
        });
    });
  }
}

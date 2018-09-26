import React, { Component } from 'react'
import * as LocalData from '../LocalData'

const localySavedauthToken = LocalData.load('token')

export const AuthContext = React.createContext({})

export class AuthProvider extends Component {
  state = {
    loggedIn: !!localySavedauthToken,
    authToken: localySavedauthToken
  }

  userLoggedIn (authToken) {
    LocalData.save('token', authToken)
    this.setState({ loggedIn: true, authToken })
  }

  render () {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          userLoggedIn: token => this.userLoggedIn(token)
        }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}
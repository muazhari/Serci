import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import StartNavigator from './StartNavigator'

import Loading from '../screens/Loading'
import SignUpScreen from '../screens/SignUpScreen'
import ChatScreen from '../screens/ChatScreen'

export default createAppContainer(
	createSwitchNavigator(
		{
			// You could add another route here for authentication.
			// Read more at https://reactnavigation.org/docs/en/auth-flow.html
			Loading,
			SignUpScreen,
			Start: StartNavigator,
			Main: MainTabNavigator,
			Chat: ChatScreen,
		},
		{ initialRouteName: 'Loading' }
	)
)

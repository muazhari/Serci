import React from 'react'
import { Platform } from 'react-native'
import {
	createStackNavigator,
	createBottomTabNavigator,
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import SignInScreen from '../screens/SignInScreen'
import StarterScreen from '../screens/StarterScreen'

const LoginStack = createStackNavigator({ Login: SignInScreen })

LoginStack.navigationOptions = {
	tabBarLabel: 'Login',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
		/>
	),
}

// const SignUpStack = createStackNavigator({ Login: LoginScreen })
//
// SignUpStack.navigationOptions = {
// 	tabBarLabel: 'SignUp',
// 	tabBarIcon: ({ focused }) => (
// 		<TabBarIcon
// 			focused={focused}
// 			name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
// 		/>
// 	),
// }

const StarterStack = createStackNavigator({ Starter: StarterScreen })

StarterStack.navigationOptions = {
	tabBarLabel: 'Starter',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios'
					? `ios-information-circle${focused ? '' : '-outline'}`
					: 'md-information-circle'
			}
		/>
	),
}

export default createBottomTabNavigator({ StarterStack, LoginStack })

import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

import {
	Container,
	Header,
	Content,
	Text,
	Icon,
	Button,
	InputGroup,
	Input,
} from 'native-base'

import firebase from 'firebase'

export default class Loading extends React.Component {
	componentDidMount() {
		firebase.auth().onAuthStateChanged(this.onAuth)
	}

	state = {
		errorMessage: null,
	}

	// 3.
	onAuth = user => {
		try {
			this.props.navigation.navigate(user ? 'Main' : 'Start')
		} catch ({ message }) {
			alert(message)
		}
	}

	render() {
		return (
			<Container style={styles.container}>
				<Text style={styles.loadingText}>Loading..</Text>
				<ActivityIndicator style={styles.loading} size="large" />
				{/* {this.state.errorMessage && (
					<Text>{this.state.errorMessage}</Text>
				)} */}
			</Container>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loading: {
		// flex: 1,
		top: 10,
		// justifyContent: 'center',
		// alignSelf: 'center',
	},
	loadingText: {
		// flex: 1,
		// alignSelf: 'center',
	},
})

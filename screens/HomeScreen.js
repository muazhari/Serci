import React from 'react'
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native'

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

import { WebBrowser } from 'expo'

import { MonoText } from '../components/StyledText'

import { Requires } from '../config/Wrapper'

import firebase from 'firebase'

class HomeScreen extends React.Component {
	static navigationOptions = {
		header: null,
	}
	state = { currentUser: null, errorMessage: null, name: '' }

	handleLogOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => this.props.navigation.navigate('Loading'))
			.catch(error => this.setState({ errorMessage: error.message }))
	}
	componentDidMount() {
		const { currentUser } = firebase.auth()
		this.setState({ currentUser })
	}

	handleJoinChat = () => {
		this.button.disabled = true

		this.state.name
			? this.props.navigation.navigate('Chat', {
					name: this.state.name,
			  })
			: alert('Enter a Nickname!')

		this.button.disabled = false
	}

	render() {
		const { currentUser } = this.state

		return (
			<View style={styles.container}>
				<ScrollView
					style={styles.container}
					contentContainerStyle={styles.contentContainer}
				>
					<View style={styles.welcomeContainer}>
						<Image
							source={__DEV__ ? Requires.RDEV : Requires.RPROD}
							style={styles.welcomeImage}
						/>
					</View>

					<View style={styles.getStartedContainer}>
						{this._maybeRenderDevelopmentModeWarning()}

						<Text style={styles.getStartedText}>
							Hi {currentUser && currentUser.email}!
						</Text>

						<View
							style={[
								styles.codeHighlightContainer,
								styles.homeScreenFilename,
							]}
						>
							<MonoText style={styles.codeHighlightText}>
								You are Logged On!
							</MonoText>
						</View>

						<Text style={styles.getStartedText}>
							Yay thanks for using ^_^
						</Text>
					</View>

					<InputGroup
						style={{
							flex: 1,
							top: 18,
							alignSelf: 'center',
							width: '50%',
						}}
					>
						<Input
							textAlign={'center'}
							placeholder="Enter nickname here"
							onChangeText={name => this.setState({ name })}
							value={this.state.name}
						/>
					</InputGroup>
					<Button
						info
						rounded
						style={{
							flex: 1,
							width: '50%',
							alignSelf: 'center',
							top: 30,
						}}
						ref={button => (this.button = button)}
						onPress={this.handleJoinChat}
					>
						<Text>Join!</Text>
					</Button>

					<View style={styles.helpContainer}>
						<TouchableOpacity
							onPress={this._handleHelpPress}
							style={styles.helpLink}
						>
							<Text style={styles.helpLinkText}>
								Do you need help? click me!
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>

				<View style={styles.tabBarInfoContainer}>
					{this.state.errorMessage && (
						<Text style={{ color: 'red' }}>
							{this.state.errorMessage}
						</Text>
					)}

					<View
						style={[
							styles.codeHighlightContainer,
							styles.navigationFilename,
						]}
					>
						<TouchableOpacity onPress={this.handleLogOut}>
							<Text style={styles.helpLinkText}>Log Out</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}

	_maybeRenderDevelopmentModeWarning() {
		if (__DEV__) {
			const learnMoreButton = (
				<Text
					onPress={this._handleLearnMorePress}
					style={styles.helpLinkText}
				>
					Learn more
				</Text>
			)

			return (
				<Text style={styles.developmentModeText}>
					Development mode is enabled, your app will be slower but you
					can use useful development tools. {learnMoreButton}
				</Text>
			)
		} else {
			return (
				<Text style={styles.developmentModeText}>
					You are not in development mode, your app will run at full
					speed.
				</Text>
			)
		}
	}

	_handleLearnMorePress = () => {
		WebBrowser.openBrowserAsync(
			'https://docs.expo.io/versions/latest/guides/development-mode'
		)
	}

	_handleHelpPress = () => {
		WebBrowser.openBrowserAsync(
			'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
		)
	}
}

export default HomeScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	developmentModeText: {
		marginBottom: 20,
		color: 'rgba(0,0,0,0.4)',
		fontSize: 14,
		lineHeight: 19,
		textAlign: 'center',
	},
	contentContainer: {
		paddingTop: 30,
	},
	welcomeContainer: {
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 20,
	},
	welcomeImage: {
		width: 100,
		height: 80,
		resizeMode: 'contain',
		marginTop: 3,
		marginLeft: -10,
	},
	getStartedContainer: {
		alignItems: 'center',
		marginHorizontal: 50,
	},
	homeScreenFilename: {
		marginVertical: 7,
	},
	codeHighlightText: {
		color: 'rgba(96,100,109, 0.8)',
	},
	codeHighlightContainer: {
		backgroundColor: 'rgba(0,0,0,0.05)',
		borderRadius: 3,
		paddingHorizontal: 4,
	},
	getStartedText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		lineHeight: 24,
		textAlign: 'center',
	},
	tabBarInfoContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		...Platform.select({
			ios: {
				shadowColor: 'black',
				shadowOffset: { height: -3 },
				shadowOpacity: 0.1,
				shadowRadius: 3,
			},
			android: {
				elevation: 20,
			},
		}),
		alignItems: 'center',
		backgroundColor: '#fbfbfb',
		paddingVertical: 20,
	},
	tabBarInfoText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		textAlign: 'center',
	},
	navigationFilename: {
		marginTop: 5,
	},
	helpContainer: {
		marginTop: 27,
		alignItems: 'center',
	},
	helpLink: {
		paddingVertical: 15,
	},
	helpLinkText: {
		fontSize: 14,
		color: '#2e78b7',
	},
})

import React from 'react'
import {
	Platform,
	Image,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native'

import { Container, Header, Content, Text, Icon, Button } from 'native-base'

import FormAuth from '../components/FormAuth'
import ButtonLog from '../components/ButtonLog'
import Wallpaper from '../components/Wallpaper'

import { Colors, Strings, EnvInfo, Requires } from '../config/Wrapper'

import firebase from 'firebase'

interface State {
	email: string;
	password: string;
	// We add a field that tracks if the user has already
	// touched the input...
	emailTouched: boolean;
	passwordTouched: boolean;
}

class SignInScreen extends React.Component<{}, State> {
	static navigationOptions = {
		header: null,
	}

	constructor(props) {
		super(props)
		//
	}

	state: State = {
		email: '',
		password: '',
		emailTouched: false,
		passwordTouched: false,
		errorMessage: null,
		buttonLock: false,
		inputs: [],
	}

	handleEmailChange = (email: string) => {
		this.setState({ email: email, errorMessage: null })
	}

	handlePasswordChange = (password: string) => {
		this.setState({ password: password, errorMessage: null })
	}

	// ...and we update them in the input onBlur callback
	handleEmailBlur = () => {
		this.setState({ emailTouched: true })
	}

	handlePasswordBlur = () => {
		this.setState({ passwordTouched: true })
	}

	handleLoginPress = () => {
		const { email, password } = this.state

		this.setState({ buttonLock: true })

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => this.props.navigation.navigate('Main'))
			.catch(error =>
				this.setState({
					errorMessage: error.message,
					buttonLock: false,
				})
			)
	}

	// When the "next" button is pressed, focus the password
	changeInputFocus = index => () => {
		this.state.inputs[index].state.inputRef._root.focus()
	}

	render() {
		const {
			email,
			password,
			emailTouched,
			passwordTouched,
			buttonLock,
		} = this.state
		// Show the validation errors only when the inputs
		// are empty AND have been blurred at least once
		const emailError =
			!email && emailTouched ? Strings.EMAIL_REQUIRED : undefined
		const passwordError =
			!password && passwordTouched ? Strings.PASSWORD_REQUIRED : undefined

		const buttonDisabled = !buttonLock ? !email || !password : true
		const buttonStatus = !buttonLock ? Strings.LOGIN : Strings.LOGIN_LOADING

		return (
			<Container style={styles.container}>
				<KeyboardAvoidingView
					style={styles.kav}
					keyboardVerticalOffset={30}
					behavior="padding"
				>
					<Image source={Requires.LOGO} style={styles.logo} />
					<Container style={styles.form}>
						<FormAuth
							iconName={'md-mail'}
							value={this.state.email}
							autoFocus={true}
							changeFocus={this.changeInputFocus('password')}
							onChangeText={this.handleEmailChange}
							// `blurOnSubmit` causes a keyboard glitch on
							// Android when we want to manually focus the
							// next input.
							blurOnSubmit={EnvInfo.IS_IOS}
							placeholder={Strings.EMAIL_PLACEHOLDER}
							keyboardType="email-address"
							returnKeyType="next"
							onBlur={this.handleEmailBlur}
							error={emailError}
						/>
						<FormAuth
							ref={ref => {
								this.state.inputs['password'] = ref
							}}
							iconName={'md-lock'}
							value={this.state.password}
							onChangeText={this.handlePasswordChange}
							placeholder={Strings.PASSWORD_PLACEHOLDER}
							secureTextEntry={true}
							returnKeyType="done"
							onBlur={this.handlePasswordBlur}
							error={passwordError}
						/>

						{this.state.errorMessage && (
							<Text
								style={{
									top: 0,
									bottom: 30,
									alignSelf: 'center',
									alignItems: 'center',
									color: 'red',
								}}
							>
								{this.state.errorMessage}
							</Text>
						)}
					</Container>
				</KeyboardAvoidingView>

				<ButtonLog
					style={styles.button}
					label={buttonStatus}
					onPress={this.handleLoginPress}
					disabled={buttonDisabled}
				/>

				<TouchableOpacity
					style={styles.signText}
					onPress={() =>
						this.props.navigation.navigate('SignUpScreen')
					}
				>
					<Text>Didn't have an account? Sign Up now.</Text>
				</TouchableOpacity>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 65,
		// marginBottom: 65,
		backgroundColor: Colors.WHITE,
	},
	kav: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	logo: {
		flex: 2,
		width: '150%',
		resizeMode: 'contain',
		alignSelf: 'center',
	},
	form: {
		flex: 3,
		top: 0,
		bottom: 20,
		justifyContent: 'center',
		width: '80%',
	},
	button: {
		flex: 1,
		width: '80%',
		// top: 45,
		bottom: 45,
		alignSelf: 'center',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	signText: {
		// top: 20,
		bottom: 20,
		fontSize: 12,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
})

export default SignInScreen

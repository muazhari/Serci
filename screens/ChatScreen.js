import React from 'react'
import {
	Platform,
	Image,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableOpacity,
	BackHandler,
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
	Title,
} from 'native-base'

import FormAuth from '../components/FormAuth'
import ButtonLog from '../components/ButtonLog'
import Wallpaper from '../components/Wallpaper'

import { Colors, Strings, EnvInfo, Requires } from '../config/Wrapper'

import firebase from 'firebase'
import Fire from '../Fire'

import { GiftedChat } from 'react-native-gifted-chat'

class ChatScreen extends React.Component<{}, State> {
	constructor(props) {
		super(props)
		this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
	}

	handleBackButtonClick() {
		// this.props.navigation.goBack(null)
		this.props.navigation.navigate('Main')
		return true
	}

	static navigationOptions = ({ navigation }) => ({
		title: (navigation.state.params || {}).name || 'Chat!',
	})
	// 3.
	state: State = {
		messages: [],
	}

	get uid() {
		return (firebase.auth().currentUser || {}).uid
	}

	componentDidMount() {
		BackHandler.addEventListener(
			'hardwareBackPress',
			this.handleBackButtonClick
		)

		Fire.shared.on(message =>
			this.setState(previousState => ({
				messages: GiftedChat.append(previousState.messages, message),
			}))
		)
	}
	// 2.
	componentWillUnmount() {
		BackHandler.addEventListener(
			'hardwareBackPress',
			this.handleBackButtonClick
		)
		Fire.shared.off()
	}

	get user() {
		// Return our name and our UID for GiftedChat to parse
		return {
			name: this.props.navigation.state.params.name,
			_id: this.uid,
		}
	}

	exitChat = () => {
		this.button.disabled = true
		;() => this.props.navigation.navigate('Start')

		this.button.disabled = false
	}

	render() {
		return (
			<Container>
				<Header
					style={{
						backgroundColor: Colors.DODGER_BLUE,
						height: 60,
					}}
				>
					{/* <Button
						style={{
							alignItems: 'flex-start',
							alignSelf: 'flex-start',
							justifyContent: 'center',
							top: 5,
						}}
						transparent
						onPress={() => this.exitChat}
					>
						<Icon name="ios-arrow-back" />
					</Button> */}

					<Title style={{ alignSelf: 'center', top: 6 }}>
						{this.props.navigation.state.params.name}
					</Title>

					{/* <Button
						transparent
						style={{
							alignItems: 'flex-end',
							alignSelf: 'flex-end',
							justifyContent: 'center',
							// bottom: 3,
						}}
					>
						<Icon name="ios-menu" />
					</Button> */}
				</Header>

				<GiftedChat
					messages={this.state.messages}
					onSend={Fire.shared.send}
					user={this.user}
				/>

				<KeyboardAvoidingView behavior="padding" />
			</Container>
		)
	}
}

const styles = StyleSheet.create({})

export default ChatScreen

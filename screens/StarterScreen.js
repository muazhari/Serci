import React from 'react'
import { Image, StyleSheet } from 'react-native'

import { Container, Header, Content, Button, Text } from 'native-base'
import { WebBrowser } from 'expo'

import { MonoText } from '../components/StyledText'

import { Colors, Strings, Requires } from '../config/Wrapper'

class StarterScreen extends React.Component {
	static navigationOptions = {
		header: null,
	}

	render() {
		return (
			<Container style={styles.container}>
				<Image source={Requires.LOGO} style={styles.logo} />

				<Container style={styles.LinkIG}>
					<Button rounded info onPress={this.handleIGPress}>
						<Text>Hello! Touch me for Love ~</Text>
					</Button>
				</Container>
			</Container>
		)
	}

	handleIGPress = () => {
		WebBrowser.openBrowserAsync('https://www.instagram.com/kurismus/')
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.WHITE,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		flex: 1,
		width: '70%',
		resizeMode: 'contain',
		alignSelf: 'center',
		paddingVertical: 200,
	},
	LinkIG: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 75,
	},
})

export default StarterScreen

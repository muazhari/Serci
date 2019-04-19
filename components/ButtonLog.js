import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Spinner } from 'native-base'
import colors from '../config/Colors'

interface Props {
	disabled?: boolean; // Add a "disabled" prop
	label: string;
	onPress: () => void;
	style: object;
}

class ButtonLog extends React.Component<Props> {
	render() {
		const { disabled, label, onPress, style } = this.props
		// If the button is disabled we lower its opacity
		const containerStyle = [
			style,
			styles.container,
			disabled ? styles.containerDisabled : styles.containerEnabled,
		]
		return (
			<Button
				rounded
				info
				style={containerStyle}
				onPress={onPress}
				disabled={disabled}
			>
				<Icon name="md-log-in" size={32} />
				<Text style={styles.text}>{label}</Text>
			</Button>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.DODGER_BLUE,
	},
	text: {
		color: colors.WHITE,
		textAlign: 'center',
		height: 20,
	},
	containerEnabled: {
		opacity: 1,
	},
	containerDisabled: {
		opacity: 0.5,
	},
})

export default ButtonLog

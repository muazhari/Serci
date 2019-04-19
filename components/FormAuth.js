import React from 'react'
import {
	Text,
	TextInput,
	TextInputProps,
	TextInputFocusEventData,
	Platform,
	StyleSheet,
	View,
} from 'react-native'

import { InputGroup, Input, Icon } from 'native-base'

import { Colors } from '../config/Wrapper'

// // We support all the TextInput props
// type Props = TextInputProps & {
// 	error?: string,
//     iconName: object;
// 	iconStyle: object;
// }

interface Props {
	error?: string;
	iconName: object;
	iconStyle: object;
	changeFocus: () => void;
}

class FormAuth extends React.Component<Props, State> {
	// Create a React ref that will be used to store the
	// TextInput reference

	constructor(props) {
		super(props)
		this.inputRef = null
	}

	state: State = {
		isFocused: false,
	}

	handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		this.setState({ isFocused: true })
		// Remember to propagate the `onFocus` event to the
		// parent as well (if set)
		if (this.props.onFocus) {
			this.props.onFocus(e)
		}
	}

	handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		this.setState({ isFocused: false })
		// Remember to propagate the `onBlur` event to the
		// parent as well (if set)
		if (this.props.onBlur) {
			this.props.onBlur(e)
		}
	}
	render() {
		// We define our own custom style for the TextInput, but
		// we still want to allow the developer to supply its
		// own additional style if needed.
		// To do so, we extract the "style" prop from all the
		// other props to prevent it to override our own custom
		// style.
		//
		// On Android we want to change the color of the input
		// underline when it is focused. To do so this component
		// must be aware of being focused, so we'll use the
		// TextInput `onFocus` and `onBlur` callbacks to set
		// a variable in the state that keeps track of when the
		// TextInput is focused.
		// We should also make sure to remove the `onFocus` and
		// `onBlur` props from the `...otherProps`, otherwise
		// they would override our own handlers.
		const {
			error,
			onFocus,
			onBlur,
			iconName,
			iconStyle,
			...otherProps
		} = this.props
		const { isFocused } = this.state
		return (
			<View style={[styles.container]}>
				<InputGroup icon borderType="regular">
					<Icon
						name={iconName}
						style={
							!error
								? { color: '#00C497' }
								: { color: Colors.TORCH_RED }
						}
					/>
					<Input
						ref={ref => {
							this.state.inputRef = ref
						}}
						selectionColor={Colors.DODGER_BLUE}
						// underlineColorAndroid={
						// 	isFocused ? Colors.DODGER_BLUE : Colors.SILVER
						// }
						style={styles.textInput}
						onFocus={this.handleFocus}
						// onSubmitEditing={this.props.changeFocus}
						onSubmitEditing={this.props.changeFocus}
						onBlur={this.handleBlur}
						autoCorrect={false}
						autoCapitalize={'none'}
						// ...and then spread all the other props
						{...otherProps}
					/>
				</InputGroup>
				<Text style={styles.errorText}>{error || ''}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 0,
	},
	errorText: {
		// Setting a fixed text height prevents the label
		// "jump" when we show/hide it
		height: 20,
		color: Colors.TORCH_RED,
		// ...and here as well
		...Platform.select({
			android: {
				paddingLeft: 6,
			},
		}),
	},
	textInput: {
		height: 40,
		...Platform.select({
			ios: {
				borderColor: Colors.SILVER,
				borderBottomWidth: StyleSheet.hairlineWidth,
			},
			// The underline on Android is slightly misaligned so
			// we fix it by adding a left padding here...
			android: {
				paddingLeft: 6,
			},
		}),
	},
})

export default FormAuth

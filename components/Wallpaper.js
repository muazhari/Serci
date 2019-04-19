import React from 'react'
import { StyleSheet, Image } from 'react-native'

// import bgSrc from '../images/wallpaper.png'

interface Props {
	source: string;
}

export default class Wallpaper extends React.Component<Props> {
	render() {
		const { source } = this.props
		return (
			<Image style={styles.picture} source={source}>
				{this.props.children}
			</Image>
		)
	}
}

const styles = StyleSheet.create({
	picture: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
	},
})

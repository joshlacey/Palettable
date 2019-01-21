/*global document */
import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import PropTypes from 'prop-types';
import * as utils from '../../../../../utils/helpers';

export default class ColorPicker extends Component {
	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func)
	}

	state = {
		pickerColor: ''
	};

	componentDidMount() {
		document.querySelector('.chrome-picker').style.cssText =
			'background: rgb(255, 255, 255); border: 1px solid #ccc; border-radius: 2px; box-sizing: initial; width: 100%; font-family: Menlo;';
	}

	componentWillUnmount() {
		this.props.actions.removeColors();
	}

	handleSlider = color => {
		const c = color.rgb;
		const string = `rgb(${c.r},${c.g},${c.b})`;
		this.setState({ pickerColor: string });
	};

	addColor = () => {
		const { pickerColor } = this.state
		if(pickerColor) {
			const hexedColor = utils.rgbToHex(pickerColor);
			this.props.actions.addColor(hexedColor);
		}
	}

	render() {
		return (
			<div>
				<div>
					<ChromePicker
						disableAlpha={true}
						color={this.state.pickerColor}
						onChangeComplete={this.handleSlider}
					/>
				</div>
				<button
					style={{ width: '100%', marginTop: '15px' }}
					className={'nice-button'}
					onClick={this.addColor}
				>
					Add Color
				</button>
			</div>
		);
	}
}

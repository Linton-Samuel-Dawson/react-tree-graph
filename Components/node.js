import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment-jalaali';


const propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	keyProp: PropTypes.string.isRequired,
	labelProp: PropTypes.string.isRequired,
	offset: PropTypes.number.isRequired,
	radius: PropTypes.number.isRequired,
	circleProps: PropTypes.object.isRequired,
	gProps: PropTypes.object.isRequired,
	textProps: PropTypes.object.isRequired
};

export default class Node extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleRightClick = this.handleRightClick.bind(this);
	}

	handleClick(event) {
		this.props.gProps.onClick && this.props.gProps.onClick(this.props[this.props.keyProp], event);
	}

	handleRightClick(event) {
		this.props.gProps.onContextMenu && this.props.gProps.onContextMenu(this.props[this.props.keyProp], event);
	}

	getTransform() {
		return 'translate(' + this.props.y + ', ' + this.props.x + ')';
	}

	render() {
		return (
			<g {...this.props.gProps} transform={this.getTransform()} onContextMenu={this.handleRightClick}
			   onClick={this.handleClick}>
				<circle {...this.props.circleProps} r={this.props.radius}
						style={{fill: this.props.color ? this.props.color : '#ff9600'}}/>
				<text {...this.props.textProps}
					  dx={this.props.radius + 55}
					  dy={this.props.offset - 16}>
					{
						this.props.status &&
						(this.props.status == 'TO_DO' ? String.fromCharCode(0x2610) :
							(this.props.status == 'DOING' ? String.fromCharCode(0x23F2) : String.fromCharCode(0x2611)))

					}
					{`${this.props[this.props.labelProp]}`}

					{
						this.props.created_at &&
						` | ${moment(this.props.created_at).format('jMM/jDD')}`
					}
					{
						this.props.executives && this.props.executives.length > 0 &&
						(this.props.executives.length > 1
							? this.props.executives[0]['name']
							+ ' , ' +
							this.props.executives[1]['name']
							:
							this.props.executives[0]['name'])
					}
				</text>
			</g>);
	}
}

Node.propTypes = propTypes;

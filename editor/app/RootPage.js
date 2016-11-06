import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from './actions/Actions';
import * as HttpActions from './actions/HttpActions';

import ToolBar from './components/ToolBar';

import './styles/base.scss';

class RootPage extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { httpActions, actions, editor } = this.props;
		return(
			<div className="rootPage">
				<ToolBar http={ httpActions } 
						 actions = { actions }
						 editor = { editor }>
				</ToolBar>
			</div>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return {
		editor: state.editor
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch),
		httpActions: bindActionCreators(HttpActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RootPage);
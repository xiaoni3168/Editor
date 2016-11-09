import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';

import * as Actions from './actions/Actions';
import * as HttpActions from './actions/HttpActions';

import ToolBar from './components/ToolBar';
import FileSystemTree from './components/FileSystemTree';
import FileViewer from './components/FileViewer';

import './styles/base.scss';

class RootPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filePath: ''
		}
	}
	render() {
		const { httpActions, actions, editor } = this.props;
		return(
			<ReactIScroll
				iScroll={iScroll}
				options={{
					scrollbars: false,
					preventDefault: true,
					click: true
				}}>
			<div className="rootPage">
				<ToolBar http={ httpActions }
						 actions={ actions }
						 editor={ editor }>
				</ToolBar>
				<div className="h-100 w-100">
				{
					(() => {
						if(this.state.filePath) {
							return (
								<FileSystemTree></FileSystemTree>
							)
						}
					})()
				}
				<FileViewer editor={ editor }
							actions={ actions }
							http={ httpActions }>
				</FileViewer>
				</div>
			</div>
			</ReactIScroll>
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

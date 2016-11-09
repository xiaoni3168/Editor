import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import classnames from 'classnames';

import style from '../styles/fontawesome/fontawesome.css';
import '../styles/components/toolbar.scss';

export default class ToolBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orignalPath: 'nirui',
			filePath: 'nirui',
			lastFilePath: [],
			showAbout: false,
			openFileOptionPanel: false,
			showFileChose: false,
			showHiddenFile: false,
			loadingFileSystem: false
		}
	}

	clear() {
		const { actions } = this.props;
		this.setState({
			orignalPath: 'nirui',
			filePath: 'nirui',
			lastFilePath: [],
			showAbout: false,
			openFileOptionPanel: false,
			showFileChose: false,
			showHiddenFile: false,
			loadingFileSystem: false
		});
		actions.setFileSystem([]);
	}

	toggleFileOptionPanel() {
		this.setState({ openFileOptionPanel: !this.state.openFileOptionPanel });
	}

	openFileChose(path = 'nirui') {
		const { http, actions } = this.props;
		this.setState({ showFileChose: true });
		this.setState({ loadingFileSystem: true });
		http.getFileRoot(path).then((response) => {
			actions.setFileSystem(response.data);
			this.setState({ loadingFileSystem: false });
		}).catch(err => {
			console.log(err);
			this.setState({ loadingFileSystem: false });
		})
	}

	showAbout() {
		this.setState({ showAbout: true });
	}

	closeAbout() {
		this.setState({ showAbout: false });
	}

	render() {
		const { editor, actions } = this.props;

		let showAbout = classnames('about', this.state.showAbout?'visiable':'hidden');
		let showFileOptionPanel = classnames('file-panel', this.state.openFileOptionPanel?'visiable':'hidden');
		let showFileChose = classnames('file-chose', 'c-fff', this.state.showFileChose?'visiable':'hidden');

		let FileChose = (
			<div className={ classnames('bg-cover', this.state.showFileChose?'visiable':'hidden') }>
				<div className={ showFileChose }>
					<div className="file-chose-header">
						<Hammer onTap={ () => { this.setState({ showHiddenFile: !this.state.showHiddenFile }) } }>
							<div className="hidden-file-op">
								<span className="label">Show hidden file</span>
								<span className={ classnames('fa', 'fa-check-square', {'checked': this.state.showHiddenFile}) }></span>
							</div>
						</Hammer>
						<div className="list-style pull-right clearfix">
							<span className="fa fa-th-large"></span>
							<span className="fa fa-th-list"></span>
							<span className="fa fa-align-justify"></span>
						</div>
					</div>
					<Hammer onSwipe={ ()=> {
			            		if(this.state.filePath != this.state.orignalPath) {
			            			let path = this.state.lastFilePath.pop();
			            			this.openFileChose(path);
			            			this.setState({ filePath: path });
			            		}
			            	} }
	            			direction="DIRECTION_RIGHT">
					<div className="content-wrap">
						<ReactIScroll
			                iScroll={iScroll}
			                options={{
								mouseWheel: true,
								scrollX: true,
			                    scrollbars: false,
			                    preventDefault: true,
			                    click: true
			                }}>
				            <div>
								<div className="file-chose-content clearfix">
								{
									editor.fileSystem.map((file) => {
										return (
											<Hammer key={ file.name }
													onTap={ () => {
													 	actions.toggleFileCheck(file)
													} }
													onDoubleTap={ ()=> {
														if(file.isDirectory) {
															actions.setFileSystem([]);
															this.openFileChose(this.state.filePath + '/' + file.name);
															this.state.lastFilePath.push(this.state.filePath);
															this.setState({ filePath: this.state.filePath + '/' + file.name });
														}
														if(file.isFile) {
															this.setState({showFileChose: false})
															let tab = {
																name: file.name,
																path: this.state.filePath + '/' + file.name,
																suffix: file.isHidden?'':file.name.substr(file.name.lastIndexOf('.')+1, file.name.length)
															};
															this.clear();
															actions.addFileTabs(tab);
															actions.setActiveTab(tab);
															actions.setImageViewerFile(null);
														}
													} }>
												<div className={ classnames('file-item', {
														'hidden-file': file.isHidden,
														'hidden': !this.state.showHiddenFile&&file.isHidden,
														'checked': file.checked
													 }) }>
													<span className={ classnames('fa', {'fa-file': file.isFile, 'fa-folder': file.isDirectory}) }></span>
													<span className="file-name">{ file.name }</span>
												</div>
											</Hammer>
										);
									})
								}
								</div>
							</div>
						</ReactIScroll>
					</div>
					</Hammer>
					<div className={ classnames('file-loading', {'show': this.state.loadingFileSystem}) }>
						<span className="fa fa-cog fa-spin fa-3x fa-fw"></span>
					</div>
					<div className="file-chose-footer">
						<div className="file-total">共{ editor.fileSystem.length }项内容</div>
						<div className="op open">open</div>
						<Hammer onTap={ () => { this.clear(); } }>
							<div className="op cancel">cancel</div>
						</Hammer>
					</div>
				</div>
			</div>
		);

		let FileItem = (
			<Hammer onTap={ () => { this.toggleFileOptionPanel() } }>
				<div className={ classnames('item', 'pull-left', this.state.openFileOptionPanel?'actived':'') }>
					<span className="">File</span>
					<div className={ showFileOptionPanel }>
						<Hammer onTap={ () => { this.openFileChose() } }>
							<div className="option">Open...</div>
						</Hammer>
					</div>
				</div>
			</Hammer>
		);

		let About = (
			<div className={ showAbout }>
				<div className="head">
					<Hammer onTap={ () => { this.closeAbout() } }>
						<div className="close">
							<span className="fa fa-close"></span>
						</div>
					</Hammer>
				</div>
				<div className="content">
					<span className="fa fa-etsy fa-lg"></span>
					<div className="time">2016-11-06</div>
				</div>
			</div>
		);

		return (
			<div className="tool-bar c-fff">
				<div>
					<Hammer onTap={ () => { this.showAbout() } }>
						<div className="item pull-left">
							<span className="fa fa-etsy fa-lg"></span>
						</div>
					</Hammer>
					{ FileItem }
				</div>
				{ FileChose }
				{ About }
			</div>
		)
	}
}

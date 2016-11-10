import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import classnames from 'classnames';

import '../styles/components/fileviewer.scss';
import '../styles/svgs/svgs.scss';

export default class FileViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileSuffix: {
                image: ['png', 'jpg', 'jpeg', 'gif'],
                html: ['html'],
                css: ['css'],
                sass: ['scss'],
                js: ['js'],
                json: ['json'],
                markdown: ['md'],
                audio: ['wav']
            },
            imageStyle: {},
            audio: null,
            audioPlayer: null
        }
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        const { http, editor, actions } = this.props;
        const { audio } = this.refs;
        if(editor.activeTab.suffix&&this.checkFileSuffix(editor.activeTab.suffix) == 'image') {
            if(editor.activeTab.path&&!editor.base64Image) {
                http.getImageFile(editor.activeTab.path).then((response) => {
                    actions.setImageViewerFile('data:image/png;base64,' + response.data);
                    this.imageCalc('data:image/png;base64,' + response.data);
                });
            }
        }
        if(editor.activeTab.suffix&&this.checkFileSuffix(editor.activeTab.suffix) == 'audio') {
            if(editor.activeTab.path&&!editor.audioPath) {
                actions.setAudioPath(editor.activeTab.path);
                this.setState({audio: '/api/file/audio/' + editor.activeTab.path});
                if(this.state.audioPlayer) {
                    this.state.audioPlayer.src = '/api/file/audio/' + editor.activeTab.path;
                }
            }
        }

        if(audio&&!this.state.audioPlayer) {
            this.setState({audioPlayer: audio});
        }
    }

    playAudio() {
        if(this.state.audioPlayer) {
            this.state.audioPlayer.play();
        }
    }

    _inArray(arr, str) {
        let result = false;
        arr.map((a) => {
            if(str === a) {
                result = true;
            }
        });
        return result;
    }

    checkFileSuffix(suffix) {
        for(let [key, value] of Object.entries(this.state.fileSuffix)) {
            if(this._inArray(value, suffix.toLowerCase())) {
                return key;
            }
        }
        return 'default';
    }

    closeTab(file) {
        const { actions } = this.props;
        actions.removeFileTabs(file);
    }

    imageCalc(base64) {
        const that = this;
        let img = new Image();
        img.src = base64;
        img.onload = () => {
            that.setState({imageStyle: {
                position: 'absolute',
                background: 'url(' + base64 + ')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: img.width/2 + 'px ' + img.height/2 + 'px',
                backgroundPosition: 'center',
                width: img.width/2 + 'px',
                height: img.height/2 + 'px',
            }});
        }
    }

    render() {
        const that = this;
        const { editor, http, rootState } = this.props;
        let Tabs = (
            <div className="viewer-tabs">
            {
                editor.fileTabs.map((file) => {
                    return (
                        <div key={ file.path } className="tab">
                            <div className="tab-head">
                                <span className={ classnames('svg', 'sm', that.checkFileSuffix(file.suffix)) }></span>
                                <span className="name">{ file.name }</span>
                                <Hammer onTap={ () => { this.closeTab(file) } }>
                                    <span className="fa fa-close"></span>
                                </Hammer>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        );


        let ImageContent = (
            <div className="image-content">
                <div></div>
                <div className="viewer-wrap">
                    <div className="image-size">
                    <ReactIScroll
                        iScroll={iScroll}
                        options={{
                            mouseWheel: true,
                            scrollbars: false,
                            scrollX: true
                        }}>
                        <div style={this.state.imageStyle}></div>
                        </ReactIScroll>
                    </div>
                </div>
            </div>
        );

        let AudioContent = (
            <div>
                <audio ref="audio"></audio>
                <div onClick={ () => { this.playAudio() } }>Play</div>
            </div>
        );

        let Content = (
            <div className="viewer-content">
            {
                (() => {
                    if(editor.activeTab.suffix&&this.checkFileSuffix(editor.activeTab.suffix) == 'image') {
                        return (ImageContent)
                    }
                    if(editor.activeTab.suffix&&this.checkFileSuffix(editor.activeTab.suffix) == 'audio') {
                        return (AudioContent)
                    }
                })()
            }
            </div>
        )

        return (
            <div className="file-viewer h-100">
            { Tabs }
            { Content }
            </div>
        )
    }
}

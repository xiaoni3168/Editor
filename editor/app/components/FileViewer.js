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
                markdown: ['md']
            }
        }
    }

    componentDidUpdate() {
        const { http, editor, actions } = this.props;
        if(editor.activeTab.path&&!editor.base64Image) {
            http.getImageFile(editor.activeTab.path).then((response) => {
                actions.setImageViewerFile('data:image/png;base64,' + response.data);
            })
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

    render() {
        const that = this;
        const { editor, http, rootState } = this.props;
        let Tabs = (
            <div className="viewer-tabs">
            {
                editor.fileTabs.map((file) => {
                    return (
                        <div key={ file.path } className="tab">
                            <div className="tab-head clearfix">
                                <span className={ classnames('svg', 'sm', 'pull-left', that.checkFileSuffix(file.suffix)) }></span>
                                <span className="name pull-left">{ file.name }</span>
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
                        <img src={ editor.base64Image } />
                    </div>
                </div>
            </div>
        )

        let Content = (
            <div className="viewer-content">
                { ImageContent }
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

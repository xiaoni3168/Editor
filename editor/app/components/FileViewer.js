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
                json: ['json']
            }
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
            if(this._inArray(value, suffix)) {
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
        const { editor } = this.props;
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
        )

        return (
            <div className="file-viewer h-100">
            { Tabs }
            </div>
        )
    }
}

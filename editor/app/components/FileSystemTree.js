import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import classnames from 'classnames';

import '../styles/components/filesystemtree.scss';

export default class FileSystemTree extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ReactIScroll
                iScroll={iScroll}
                options={{
					scrollbars: false,
					preventDefault: true,
					click: true
				}}>
                <div className="file-system-tree"></div>
            </ReactIScroll>
        )
    }
}

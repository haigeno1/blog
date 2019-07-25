var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Component } from 'react';
import history from './history';

export default class Link extends Component {
    constructor(...args) {
        var _temp;

        return _temp = super(...args), this.handleClick = e => {
            const { onClick, to } = this.props;
            if (onClick) {
                onClick(e);
            }

            e.preventDefault();
            history.push(to);
        }, _temp;
    }

    render() {
        return React.createElement('a', _extends({}, this.props, { onClick: this.handleClick }));
    }
}
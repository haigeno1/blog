var iifeName = (function (exports, React, PropTypes, pathToRegexp) {
    'use strict';

    var React__default = 'default' in React ? React['default'] : React;
    PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
    pathToRegexp = pathToRegexp && pathToRegexp.hasOwnProperty('default') ? pathToRegexp['default'] : pathToRegexp;

    const his = window.history;
    class History {
        constructor() {
            this.push = path => {
                his.pushState({}, "", path);
                this.notifyAll();
            };

            this.listen = listener => {
                this.listeners.push(listener);
                return () => {
                    this.listeners = this.listeners.filter(ele => ele !== listener);
                };
            };

            this.notifyAll = () => {
                this.listeners.forEach(lis => {
                    lis();
                });
            };

            this.listeners = [];
        }

    }

    var history = new History();

    const compilePath = (pattern = '/', options) => {
        const { exact = false, strict = false, sensitive = false } = options;
        const keys = [];
        const re = pathToRegexp(pattern, keys, { end: exact, strict, sensitive });
        return { re, keys };
    };

    const matchPath = (pathname, props, pathReAndKeys) => {
        const { path = '/', exact = false } = props;
        const { re, keys } = pathReAndKeys;
        const match = re.exec(pathname);

        if (!match) return null;

        const [url, ...values] = match;
        const isExact = pathname === url;

        if (exact && !isExact) return null;

        return {
            path, // the path pattern used to match
            url: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
            isExact, // whether or not we matched exactly
            params: keys.reduce((memo, key, index) => {
                memo[key.name] = values[index];
                return memo;
            }, {})
        };
    };

    class Route extends React.Component {

        constructor(props) {
            super(props);

            this.urlChange = () => {
                const pathname = location.pathname;
                this.setState({
                    match: matchPath(pathname, this.props, this.pathReAndKeys)
                });
            };

            this.pathReAndKeys = compilePath(props.path, {
                exact: props.exact,
                strict: props.strict,
                sensitive: props.sensitive
            });
            this.state = {
                match: matchPath(location.pathname, props, this.pathReAndKeys)
            };
            this.unlisten = history.listen(this.urlChange);
        }

        componentWillReceiveProps(nextProps) {
            const { path, exact, strict } = this.props;
            if (nextProps.path !== path || nextProps.exact !== exact || nextProps.strict !== strict) {
                console.warn("you should not change path, exact, strict props");
            }
        }

        componentWillUnmount() {
            this.unlisten();
        }

        render() {
            const { match } = this.state;
            if (!match) return null;

            const { children, component, render } = this.props;

            if (component) {
                const Comp = component;
                return React__default.createElement(Comp, { match: match });
            }
            if (render) {
                return render({ match });
            }

            return React__default.cloneElement(React__default.Children.only(children), { match });
        }
    }

    Route.propTypes = {
        path: PropTypes.string,
        component: PropTypes.func,
        render: PropTypes.func,
        exact: PropTypes.bool,
        strict: PropTypes.bool
    };

    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

    class Link extends React.Component {
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
            return React__default.createElement('a', _extends({}, this.props, { onClick: this.handleClick }));
        }
    }

    exports.Link = Link;
    exports.Route = Route;
    exports.history = history;

    return exports;

}({}, React, PropTypes, pathToRegexp));

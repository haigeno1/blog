import React, { Component } from "react";
import ReactDOM from "react-dom"; // import Route from "./src/Route";
// import Link from "./src/Link";

import { Link, Route } from "./mini-router-es";

const Home = () => React.createElement("div", null, "home");

const About = () => React.createElement("div", null, "about");

const Xxx = ({ match }) => React.createElement("div", null, match.params.id);

const NotFound = () => React.createElement("div", null, "NotFound");

class HelloWorld extends Component {
  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "ul",
        null,
        React.createElement(
          "li",
          null,
          React.createElement(
            Link,
            {
              to: "/"
            },
            "Home"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            Link,
            {
              to: "/about"
            },
            "about"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            Link,
            {
              to: "/xxx/12"
            },
            "xxx"
          )
        )
      ),
      React.createElement("hr", null),
      React.createElement(Route, {
        path: "/",
        exact: true,
        render: () => React.createElement("div", null, "home")
      }),
      React.createElement(Route, {
        path: "/about",
        component: About
      }),
      React.createElement(Route, {
        path: "/xxx/:id",
        component: Xxx
      }),
      React.createElement(Route, {
        component: NotFound
      })
    );
  }
}

ReactDOM.render(
  React.createElement(HelloWorld, null),
  document.getElementById("root")
);

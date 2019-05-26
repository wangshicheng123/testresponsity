import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Home1 from "./pages/Home1";

export default class IRouter extends Component {
    constructor(params) {
        super(params);
    }
    render() {
        return (
            <div>
                <Router>
                    <App>
                        <Route exact path="/admin/home" component={Home}></Route>
                        <Route exact path="/admin/home1" component={Home1}></Route>
                    </App>
                </Router>
            </div>
        )
    }
}
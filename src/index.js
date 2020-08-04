import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import { createApi } from "./api";
import createMatchSearch from "./components/MatchSearch/configure";
import reduxPromise from "redux-promise";

import reducer from "./redux/reducers/index";

const withMiddleware = applyMiddleware(thunk, reduxPromise);

const store = withMiddleware(createStore)(reducer);
const api = createApi(fetch);

const MatchSearch = createMatchSearch(api);

const root = document.createElement("div");
document.body.appendChild(root);

ReactDOM.render(React.createElement(App, { store, MatchSearch }), root);

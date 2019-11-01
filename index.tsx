import * as React from "react";
import {render} from "react-dom";
import {App} from "./client/App";
import "./client/index.scss";

const root = document.getElementById("root");

render(
    <App />,
    root
);

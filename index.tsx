import * as React from "react";
import {render} from "react-dom";
import {App} from "./App";
import "./index.scss";
// import * as dotenv from "dotenv";

// dotenv.config();

const root = document.getElementById("root");

render(
    <App />,
    root
);

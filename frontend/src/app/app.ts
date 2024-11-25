import { createRoot } from "react-dom/client";
import { createElement } from "react";
import {App} from "../components/App";

const rootElement = document.createElement("div"); 
document.body.appendChild(rootElement);

const root = createRoot(rootElement); 
root.render(createElement(App));
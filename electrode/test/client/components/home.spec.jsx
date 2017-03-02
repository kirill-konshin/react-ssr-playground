import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";

import Home from "../../../src/client/components/home";
import rootReducer from "../../../src/client/redux/reducer";

describe("Home", () => {
  let component;
  let container;

  beforeEach(() => {
    container = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  it("has expected content with deep render", () => {
    const initialState = {
      checkBox: false,
      number: 999,
      page: "foo"
    };

    const store = createStore(rootReducer, initialState);

    component = ReactDOM.render(
      <Home store={store}/>,
      container
    );

    expect(component).to.not.be.false;
  });
});

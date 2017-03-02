import React from "react";
import {Route} from "react-router";
import Home from "../components/home";
import Foo from "../components/foo";

const Pass = ({children}) => children;

export const routes = (
  <Route component={Pass}>
    <Route path="/" component={Home}/>
    <Route path="/foo" component={Foo}/>
  </Route>
);

import React from "react";
import Helmet from "react-helmet";

export default function WrappedHelmet(props) {

    return (
        <Helmet
            defaultTitle='Wat?'
            titleTemplate="%s | Create React App"
            {...props}
        />
    );

}
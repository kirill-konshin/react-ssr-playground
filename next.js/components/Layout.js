import React from "react";
import {connect} from "react-redux";
import Head from "next/head";

export default connect(state => state)(({children, reduxStatus, title = 'Wat?'}) => (
    <div className="container">
        <Head>
            <title>{title} | Next</title>
            <meta charSet='utf-8'/>
            <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
            <link rel="stylesheet" href="/static/styles.css" type="text/css"/>
        </Head>
        <header>
            <h1>Header [{reduxStatus}]</h1>
        </header>
        <article>
            {children}
        </article>
        <footer>
            <hr/>
            Foo
        </footer>
    </div>
));

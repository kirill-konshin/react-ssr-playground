import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";

import styles from "../styles/base.css";

export const Foo = ({page}) => (
  <div className={styles.container}>
    <h1>Foo</h1>
    <hr/>
    <pre>{page}</pre>
    <hr/>
    <Link to="/">Go to index</Link>
  </div>
);

Foo.propTypes = {
  page: PropTypes.string
};

export default connect((state) => ({
  page: state.page
}))(Foo);

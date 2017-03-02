import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {decNumber, incNumber, toggleCheck} from "../redux/actions";

import styles from "../styles/base.css";

export const Home = ({checked, value, page, onToggleCheck, onIncNumber, onDecNumber}) => (
  <div className={styles.container}>
    <h1>Index</h1>
    <hr/>
    <pre>{page}</pre>
    <label>
      <input onChange={onToggleCheck} type={"checkbox"} checked={checked}/>
      Checkbox
    </label>
    <div>
      <button type={"button"} onClick={onDecNumber}>-</button>
      &nbsp;{value}&nbsp;
      <button type={"button"} onClick={onIncNumber}>+</button>
    </div>
    <hr/>
    <Link to="/foo">Go to foo</Link>
  </div>
);

Home.propTypes = {
  onToggleCheck: PropTypes.func,
  onIncNumber: PropTypes.func,
  onDecNumber: PropTypes.func,
  page: PropTypes.string,
  checked: PropTypes.bool,
  value: PropTypes.number.isRequired
};

export default connect((state) => ({
  page: state.page,
  checked: state.checkBox,
  value: state.number
}), {
  onToggleCheck: toggleCheck,
  onIncNumber: incNumber,
  onDecNumber: decNumber
})(Home);

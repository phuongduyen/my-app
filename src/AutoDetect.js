import React from "react";
import PropTypes from "prop-types";


const style = {
  width: "14px"
};
const AutoDetect = (props) => {
  return (
    <div >
      <span className="Datalist__item h-48 c-blue flex flex-middle fs-14" onClick={ props.onClick } >
        <a className="Note__icon mr-5" fill="#36c" style={ style } /> Current location
      </span>
    </div>
  );
};
AutoDetect.propTypes = {
  onClick: PropTypes.func
};
AutoDetect.defaultProps = {
  onClick: null
};
export default AutoDetect;
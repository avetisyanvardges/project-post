import React from "react";
import PropTypes from "prop-types";

const StandardDate = ({ date }) => {
  formatDate = (prop) => {
    let date = new Date(prop);

    let year = date.getFullYear();
    let month = date.toString().slice(4, 7);
    let day = date.getDate();

    let formattedDate = month + " " + day + " " + year;
    return formattedDate;
  };

  return <React.Fragment>{formatDate(date)}</React.Fragment>;
};

StandardDate.propTypes = {};

export default StandardDate;

import React from "react";
import PropTypes from "prop-types";

const NumbersMask = (props) => {
  const formatNumber = (number) => {
    switch (true) {
      case number >= 1000000000:
        if (
          (number / 1000000000)
            .toFixed(1)
            .toString()
            .charAt((number / 1000000000).toFixed(1).toString().length - 1) ===
          "0"
        ) {
          return `${(number / 1000000000).toFixed(0)}b`;
        } else {
          return `${(number / 1000000000)
            .toString()
            .substring(
              0,
              (number / 1000000).toFixed(2).toString().length - 1
            )}b`;
        }
      case number >= 100000000:
        return `${(number / 1000000)
          .toString()
          .substring(0, (number / 1000000).toFixed(2).toString().length - 3)}m`;
      case number >= 1000000:
        if (
          (number / 1000000)
            .toFixed(1)
            .toString()
            .charAt((number / 1000000).toFixed(1).toString().length - 1) === "0"
        ) {
          return `${(number / 1000000).toFixed(0)}m`;
        } else {
          return `${(number / 1000000)
            .toString()
            .substring(
              0,
              (number / 1000000).toFixed(2).toString().length - 1
            )}m`;
        }
      case number >= 100000:
        return `${(number / 1000)
          .toString()
          .substring(0, (number / 1000).toFixed(2).toString().length - 3)}k`;
      case number >= 10000:
        if (
          (number / 1000)
            .toFixed(1)
            .toString()
            .charAt((number / 1000).toFixed(1).toString().length - 1) === "0"
        ) {
          return `${(number / 1000).toFixed(0)}k`;
        } else {
          return `${(number / 1000)
            .toString()
            .substring(0, (number / 1000).toFixed(2).toString().length - 1)}k`;
        }

      case number >= 1000:
        return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      default:
        return number;
    }
  };

  return <React.Fragment>{formatNumber(props.number)}</React.Fragment>;
};

NumbersMask.propTypes = {
  //number: PropTypes.number.isRequired,
};

export default NumbersMask;

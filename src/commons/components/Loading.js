import React from 'react';
import './loader.scss';
import { connect } from 'react-redux';

const Loading = ({ load }) => {
  return (
    <div className={`cont-load ${load ? 'flex' : 'display-none'}`}>
      <div className="loader"></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    load: state.load,
  };
};

export default connect(mapStateToProps, null)(Loading);

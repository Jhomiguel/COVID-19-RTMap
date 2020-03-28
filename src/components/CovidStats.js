import React from "react";
import { Alert } from "react-bootstrap";

const CovidStats = ({ globalstats }) => {
  return (
    <div>
      <h1>Global Stats</h1>
      <div className="contenido-stats">
        <ul className="list-group">
          <li className="list-group-item list-group-item-success">
            This is a success list group item
          </li>
          <li className="list-group-item list-group-item-danger">
            This is a danger list group item
          </li>
          <li className="list-group-item list-group-item-info">
            This is a info list group item
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CovidStats;

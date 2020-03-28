import React from "react";

const CovidStats = ({ globalstats }) => {
  return (
    <div>
      <h1>Global Stats</h1>
      <div className="contenido-stats">
        <ul className="list-group">
          <li className="list-group-item list-group-item-dark justify-content-between align-items-center d-flex">
            Total Cases
            <span className="badge badge-primary badge-pill">
              {globalstats.total_cases}
            </span>
          </li>
          <li className="list-group-item list-group-item-danger justify-content-between align-items-center d-flex">
            Total Deaths
            <span className="badge badge-primary badge-pill">
              {globalstats.total_deaths}
            </span>
          </li>
          <li className="list-group-item list-group-item-success justify-content-between align-items-center d-flex">
            Total recovered
            <span className="badge badge-primary badge-pill">
              {globalstats.total_recovered}
            </span>
          </li>
          <li className="list-group-item list-group-item-dark justify-content-between align-items-center d-flex">
            Total New Cases Today
            <span className="badge badge-primary badge-pill">
              {globalstats.total_new_cases_today}
            </span>
          </li>
          <li className="list-group-item list-group-item-danger justify-content-between align-items-center d-flex">
            Total Deaths Today
            <span className="badge badge-primary badge-pill">
              {globalstats.total_new_deaths_today}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CovidStats;

import React from "react";
import { Icon } from "@iconify/react";
import "/styles/Statistics.css";

const Statistics = ({ title, stats }) => {
  return (
    <div className="statistics">
      <h2 className="section-title">{title}</h2>
      <div className="statistics-container">
        {stats.map((stat, index) => (
          <div className="statistic" key={index}>
            <Icon icon={stat.icon} className="iconify-icon" />
            <div className="value">
              {" "}
              <h2 className="statistic-value">
                {stat.value.toLocaleString()}{" "}
              </h2>
            </div>
            <div className="title">
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;

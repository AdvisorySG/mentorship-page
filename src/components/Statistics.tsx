import React from "react";

import { Icon } from "@iconify/react";

import "../styles/Statistics.css";

export interface Statistic {
  title: string;
  value: string;
  icon: string;
}

const Statistics = ({ stats }: { stats: Statistic[] }) => {
  return (
    <div className="statistics text-lg">
      <div className="statistics-container">
        {stats.map((stat, index) => (
          <div className="statistic" key={index}>
            <Icon icon={stat.icon} className="iconify-icon" />
            <div className="statistic-value">
              <h2 style={{ margin: "0.5rem 0" }}>{stat.value}</h2>
            </div>
            <div className="statistic-title">
              <p style={{ margin: 0, textAlign: "center" }}>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;

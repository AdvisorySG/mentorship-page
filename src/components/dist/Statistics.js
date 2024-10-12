"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@iconify/react");
require("../styles/Statistics.css");
var Statistics = function (_a) {
  var stats = _a.stats;
  return react_1["default"].createElement(
    "div",
    { className: "statistics text-lg" },
    react_1["default"].createElement(
      "div",
      { className: "statistics-container" },
      stats.map(function (stat, index) {
        return react_1["default"].createElement(
          "div",
          { className: "statistic", key: index },
          react_1["default"].createElement(react_2.Icon, {
            icon: stat.icon,
            className: "iconify-icon",
          }),
          react_1["default"].createElement(
            "div",
            { className: "statistic-value" },
            react_1["default"].createElement(
              "h2",
              { style: { margin: "0.5rem 0", fontSize: "2.3rem" } },
              stat.value
            ),
            react_1["default"].createElement(
              "div",
              { className: "statistic-title" },
              react_1["default"].createElement(
                "p",
                { style: { margin: 0, textAlign: "left" } },
                stat.title
              )
            )
          )
        );
      })
    )
  );
};
exports["default"] = Statistics;

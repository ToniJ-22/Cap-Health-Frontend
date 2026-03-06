import React from "react";

function Charts({ readings }) {
  return (
    <div className="chart-container">
      <h2>Blood Sugar Trend</h2>

      <div className="chart">
        {readings.map((r) => (
          <div key={r.id} className="bar-wrapper">
            <div
              className="bar"
              style={{
                height: `${r.level}px`
              }}
            >
              {r.level}
            </div>

            <span className="label">{r.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Charts;
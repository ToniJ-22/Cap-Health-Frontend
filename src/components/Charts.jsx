import React from "react";

function Charts({ readings }) {

  function formatTime(time) {
    if (!time) return "";

    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${ampm}`;
  }

  return (
    <div className="chart-container">

      <div className="chart">
        {readings
          .filter((r) => r.level && r.time)
          .slice(-10)
          .map((r) => (
            <div key={r.id} className="bar-wrapper">

              <div
                className="bar"
                style={{
                  height: `${r.level / 3}px`   // SCALE FIX
                }}
              >
                {r.level}
              </div>

              <span className="label">
                {formatTime(r.time)}
              </span>

            </div>
          ))}
      </div>

    </div>
  );
}

export default Charts;
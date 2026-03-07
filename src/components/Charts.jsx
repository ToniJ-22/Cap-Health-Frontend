import React, { useState, useEffect } from "react";

function Charts({ readings }) {

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  function formatTime(time) {
    if (!time) return "";

    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${ampm}`;
  }

  function formatDate(date){
    if(!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  function getBarColor(level){
    if(level < 70) return "#008cff";
    if(level <= 140) return "#00ff08";
    return "#fa1100";
  }

  return (
    <div className="chart-container">
      <div className="chart">

        {readings
          .filter((r) => r.level && r.time)
          .slice(-10)
          .map((r) => {

            const height = (r.level / 2000) * 180;

            return (
              <div key={r.id} className="bar-wrapper">

                <div
                  className="bar"
                  style={{
                    height: animate ? `${height}px` : "0px",
                    background: getBarColor(r.level)
                  }}
                >
                  <span className="value">{r.level}</span>
                </div>

                <div className="label">
                  <div className="date">{formatDate(r.date)}</div>
                  <div className="time">{formatTime(r.time)}</div>
                </div>

              </div>
            );
          })}

      </div>
    </div>
  );
}

export default Charts;
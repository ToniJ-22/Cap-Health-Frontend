function ChartJS() {
  const data = [
    { day: "Mon", level: 90 },
    { day: "Tue", level: 120 },
    { day: "Wed", level: 100 },
    { day: "Thu", level: 150 },
    { day: "Fri", level: 130 },
    { day: "Sat", level: 160 }
  ];

  return (
    <div className="card">
      <h3>Blood Sugar Trends</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.day}: {item.level} mg/dL
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChartJS;
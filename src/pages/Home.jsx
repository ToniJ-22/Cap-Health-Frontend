import { Link } from "react-router-dom";
import img from "../assets/images/gluecose.png";

function Home() {
  return (
    <div className="home-container">

      <section className="hero">
        
        <h2>Welcome to Your Diabetes Management System</h2>
        <p>
          This platform helps individuals monitor blood glucose levels,
          track meals, and visualize health trends in one centralized dashboard.
        </p>
        <Link to="/register">
          <button className="primary-btn">Get Started</button>
        </Link>
      </section>

  
      <section className="directory">
        <h2>Explore Features</h2>

        <div className="directory-cards">
          <div className="card">
            <h3>Blood Sugar Tracker</h3>
            <p>Log and monitor daily glucose readings.</p>
          </div>

          <div className="card">
            <h3>Meal Tracking</h3>
            <p>Record meals and monitor carbohydrate & sugar intake.</p>
          </div>

          <div className="card">
            <h3>Trend Visualization</h3>
            <p>Analyze your health progress over time.</p>
          </div>
        </div>
      </section>

    
      <section className="info-section">
        <h2>Why Tracking Matters</h2>
        <p>
          Consistent monitoring of blood sugar levels helps reduce
          complications and improves long-term health outcomes.
          This system encourages accountability and awareness.
        </p>
      </section>

      <section className="cta">
        <h2>Take Control of Your Health Today</h2>
        <p>Start tracking. Start improving. Start living better.</p>
        <Link to="/register">
          <button className="cta-btn">Create Your Free Account</button>
        </Link>
      </section>

    </div>
  );
}

export default Home;
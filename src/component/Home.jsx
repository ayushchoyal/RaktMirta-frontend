import React from "react";

const Home = () => {
  return (
    <div>
      {/* Inline CSS for hover effect */}
      <style>
        {`
          .custom-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .custom-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>



      {/* Hero Section */}
      <section
        className="d-flex align-items-center"
        style={{

          background: "linear-gradient(90deg, #f5f7fa, #c3cfe2)",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* Left side text */}
            <div className="col-md-6 text-center text-md-start p-4">
              <h1 className="fw-bold display-4 text-danger">
                Donate Blood, Save Lives
              </h1>
              <p className="lead text-dark">
                Your one donation can bring hope and health to someone in need.
              </p>
              <p className="fs-5 text-dark">
                Join hands with us to build a community where blood is always
                available for those who need it most.
              </p>
              <div className="mt-4">
                <a
                  href="/donate"
                  className="btn btn-danger btn-lg me-3 shadow-sm"
                >
                  Donate Blood
                </a>
                <a
                  href="/blood_donar"
                  className="btn btn-outline-danger btn-lg shadow-sm"
                >
                  Request Blood
                </a>
              </div>
            </div>

            {/* Right side image */}
            <div className="col-md-6 text-center mt-4 mt-md-0">
              <img
                src="bloodbanner1.jpg"
                alt="Blood Donation Banner"
                className="img-fluid rounded shadow-lg"
                style={{ maxHeight: "420px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Donate Blood Section */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4 text-danger">Why Donate Blood?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow h-100 border-0 custom-card">
                <div className="card-body">
                  <h5 className="card-title text-danger">Save Lives</h5>
                  <p className="card-text">
                    Every blood donation can save up to three lives. Be
                    someone’s hero today!
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow h-100 border-0 custom-card">
                <div className="card-body">
                  <h5 className="card-title text-danger">Community Support</h5>
                  <p className="card-text">
                    Your contribution helps hospitals and patients in emergency
                    situations.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow h-100 border-0 custom-card">
                <div className="card-body">
                  <h5 className="card-title text-danger">Healthy Practice</h5>
                  <p className="card-text">
                    Donating blood improves heart health and stimulates blood
                    cell production.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awareness / Stats Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-4 text-danger">Did You Know?</h2>
          <div className="row">
            <div className="col-md-4">
              <h3 className="text-danger fw-bold">1200+</h3>
              <p>People need blood every day in India.</p>
            </div>
            <div className="col-md-4">
              <h3 className="text-danger fw-bold">1 in 7</h3>
              <p>Hospitalized patients need blood transfusions.</p>
            </div>
            <div className="col-md-4">
              <h3 className="text-danger fw-bold">3 Lives</h3>
              <p>Saved by just one blood donation.</p>
            </div>
          </div>
        </div>
      </section>
      <footer
        className="text-dark pt-5 pb-3 mt-5"
        style={{
          background: "linear-gradient(90deg, #f5f7fa, #c3cfe2)", // same as navbar
        }}
      >
        <div className="container">
          <div className="row">
            {/* Brand & Tagline */}
            <div className="col-md-4 mb-4">
              <h4 className="fw-bold text-danger">🩸 RaktMitra</h4>
              <p className="small text-muted">
                A platform that connects blood donors with those in need. Donate
                blood, save lives, and spread hope.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold text-danger">Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/" className="text-dark text-decoration-none">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/donate" className="text-dark text-decoration-none">
                    Donate Blood
                  </a>
                </li>
                <li>
                  <a href="/request" className="text-dark text-decoration-none">
                    Request Blood
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-dark text-decoration-none">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold text-danger">Contact Us</h5>
              <p className="small mb-1">📍 Indore, Madhya Pradesh, India</p>
              <p className="small mb-1">📧 support@raktmitra.org</p>
              <p className="small">📞 +91 87876 87556</p>
              {/* Social Icons */}
              <div className="d-flex gap-3 mt-2">
                <a href="#" className="text-danger fs-5">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-danger fs-5">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-danger fs-5">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <hr />
          <div className="text-center small text-muted">
            © {new Date().getFullYear()} RaktMitra. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

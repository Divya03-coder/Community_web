import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero"
    id="hero"
  style={{ scrollMarginTop: "80px" }}>
      <div className="hero-content">
        <h1>
          Grow with the <span>Community</span>
        </h1>
        <p>
            Join a growing community of developers, creators, and learners who
            collaborate, share ideas, and build meaningful projects together.
         </p>

        <div className="hero-buttons">
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="https://illustrations.popsy.co/gray/web-design.svg"
          alt="Hero Illustration"
        />
      </div>
    </section>
  );
};

export default Hero;

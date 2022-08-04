import pokeball from "../assets/pokeball.webp";

const Navbar = () => (
  <nav className="navbar navbar-dark bg-dark">
    <div className="container">
      <a className="navbar-brand" href="/">
        <img
          src={pokeball}
          alt="pokeball"
          width="30"
          height="30"
          className="d-inline-block align-text-top me-3"
        />
        PokéDex
      </a>
    </div>
  </nav>
);

export default Navbar;

import pokeapi from "../assets/pokeapi.webp";

const Footer = () => (
  <nav className="navbar bg-light">
    <div className="container d-flex flex-row-reverse">
      <div>
        <a
          href="https://pokeapi.co/"
          className="text-dark text-decoration-none"
          target="_blank"
        >
          Powered by <img src={pokeapi} height={23} />
        </a>
      </div>
    </div>
  </nav>
);

export default Footer;

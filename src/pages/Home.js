import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPokemonList } from "../utils";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState();

  useEffect(() => {
    getPokemonList()
      .then((response) => {
        setPokemonList(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        navigate("/Error");
      });
  }, []);
  return isLoading ? (
    <div className="spinner-border text-light mx-auto d-block" />
  ) : (
    <div className="row row-cols-2 row-cols-md-3 g-4">
      {pokemonList.map((pokemon, i) => (
        <div className="col">
          <Link to={`/${i + 1}`} className="text-decoration-none">
            <div className="card btn btn-outline-dark rounded-pill">
              <div className="card-body">
                <h4 className="m-0 p-0 text-truncate">
                  <small className="text-muted">#{i + 1}</small>{" "}
                  <span className="text-capitalize">
                    {pokemon.name.replace(/\-/g, " ")}
                  </span>
                </h4>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;

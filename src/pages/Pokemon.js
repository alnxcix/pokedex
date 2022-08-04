import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { getPokemonDetails, getShortenedStat, getColorOfType } from "../utils";

const Pokemon = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState();
  const [species, setSpecies] = useState();

  useEffect(() => {
    getPokemonDetails(params.order)
      .then((response) => {
        setPokemon(response[0].data); // types, abilities, stats, sprites
        setSpecies(response[1].data); // name, flavour text
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        navigate("/Error");
      });
  }, [params.order]);

  return isLoading ? (
    <div className="spinner-border text-light mx-auto d-block" />
  ) : (
    <div className="row justify-content-center">
      <div className="col-lg-6 align-self-center">
        <div className="card w-100 mb-3">
          <div className="card-body">
            {pokemon.sprites.front_default ? null : (
              <div className="alert alert-warning">
                No sprite/image available for this Pokémon.
              </div>
            )}
            <div className="d-flex">
              {pokemon.sprites.front_default ? (
                <div className="flex-shrink-0">
                  <img
                    alt={species.name}
                    className="rounded-circle shadow"
                    src={pokemon.sprites.front_default}
                    width={200}
                  />
                </div>
              ) : null}
              <div className="flex-grow-1 ms-3">
                <div className="align-items-center d-flex mb-3">
                  <h3 className="card-title m-0 me-3 text-capitalize">
                    <small className="text-muted">#{params.order}</small>{" "}
                    {species.name.replace(/\-/, " ")}
                  </h3>
                  {pokemon.types.map((type) => (
                    <span
                      className="badge me-2 text-capitalize"
                      style={{
                        backgroundColor: getColorOfType(type.type.name),
                      }}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
                <h6 className="card-subtitle mb-3 text-muted text-capitalize">
                  Abilities:{" "}
                  {pokemon.abilities
                    .map((ability) => ability.ability.name.replace(/\-/, " "))
                    .join(", ")}
                </h6>
                <p className="card-text">
                  {JSON.stringify(
                    species.flavor_text_entries
                      .filter((e) => e.language.name === "en")[0]
                      .flavor_text.replace(/\f|\n/g, " ")
                  )}
                </p>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" colSpan={3}>
                        Stats
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {pokemon.stats.slice(0, 3).map((stat) => (
                        <td>
                          <strong>{getShortenedStat(stat.stat.name)}</strong>{" "}
                          {stat.base_stat}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {pokemon.stats.slice(3, 6).map((stat) => (
                        <td>
                          <strong>{getShortenedStat(stat.stat.name)}</strong>{" "}
                          {stat.base_stat}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <Link to="/" className="text-decoration-none">
            <button type="button" className="btn btn-light shadow-none">
              <FontAwesomeIcon icon={faHome} /> Back to Home
            </button>
          </Link>
          <div>
            <Link
              to={params.order > 1 ? `/${parseInt(params.order) - 1}` : "#"}
              className="text-decoration-none me-3"
            >
              <button
                type="button"
                className="btn btn-light shadow-none"
                disabled={params.order <= 1}
              >
                <FontAwesomeIcon icon={faChevronLeft} /> Previous
              </button>
            </Link>
            <Link
              to={params.order < 905 ? `/${parseInt(params.order) + 1}` : "#"}
              className="text-decoration-none"
            >
              <button
                type="button"
                className="btn btn-light shadow-none"
                disabled={params.order >= 905}
              >
                Next <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;

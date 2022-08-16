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
    <div className="row d-flex justify-content-center">
      <div className="col-lg-6">
        <div className="card mb-3">
          <div className="card-body">
            {pokemon.sprites.front_default ? null : (
              <div className="alert alert-warning">
                No sprite/image available for this Pokémon.
              </div>
            )}
            <div className="align-items-start d-flex flex-md-row flex-column gap-3">
              {pokemon.sprites.front_default ? (
                <img
                  alt={species.name}
                  className="mx-auto d-block rounded-circle shadow"
                  src={pokemon.sprites.front_default}
                  width={200}
                />
              ) : null}
              <div className="flex-grow-1">
                <div className="align-items-center d-flex gap-1 mb-3">
                  <h4 className="card-title text-capitalize">
                    <small className="text-muted">#{params.order}</small>{" "}
                    {species.name.replace(/\-/, " ")}
                  </h4>
                  {pokemon.types.map((type) => (
                    <div
                      className="badge text-capitalize"
                      style={{
                        backgroundColor: getColorOfType(type.type.name),
                      }}
                    >
                      {type.type.name}
                    </div>
                  ))}
                </div>
                <h6 className="card-subtitle mb-3 text-muted text-capitalize">
                  Abilities:{" "}
                  {pokemon.abilities
                    .map((ability) => ability.ability.name.replace(/\-/, " "))
                    .join(", ")}
                </h6>
                <p className="card-text lead">
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
                onClick={() => setLoading(true)}
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
                onClick={() => setLoading(true)}
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

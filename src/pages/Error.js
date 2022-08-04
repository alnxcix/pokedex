import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Error = () => {
  return (
    <div className="card w-50 mx-auto d-block">
      <div className="card-body">
        <h1 className="display-5 fw-bold">This page doesn't exist.</h1>
        <hr />
        <Link to={"/"} className="text-decoration-none">
          <button type="button" className="btn btn-dark shadow-none">
            <FontAwesomeIcon icon={faHome} /> Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;

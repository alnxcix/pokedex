import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";
import Error from "./pages/Error";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <div className="flex-grow-1">
          <Navbar />
          <div className="container py-3">
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:order" element={<Pokemon />} />
                <Route path="/error" element={<Error />} />
              </Routes>
            </Router>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;

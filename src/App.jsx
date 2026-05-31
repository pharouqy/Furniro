import { useState } from "react";
import RouteIndex from "./router/Routes";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { BrowserRouter } from "react-router-dom";
import Context from "./context/Context";

const App = () => {
  const [quantity, setQuantity] = useState(0);
  const [panier, setPanier] = useState([]);
  const [countOfLikes, setCountOfLikes] = useState(0);
  return (
    <div className="App">
      <Context.Provider
        value={{
          quantity,
          setQuantity,
          panier,
          setPanier,
          countOfLikes,
          setCountOfLikes,
        }}
      >
        <BrowserRouter>
          <Header />
          <RouteIndex />
          <Footer />
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
};

export default App;

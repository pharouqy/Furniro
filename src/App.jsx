import RouteIndex from "./router/Routes";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <RouteIndex />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

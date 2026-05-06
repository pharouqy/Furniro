import RouteIndex from "./router/Routes";
import Header from "./components/Header";

import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <RouteIndex />
      </BrowserRouter>
    </div>
  );
};

export default App;

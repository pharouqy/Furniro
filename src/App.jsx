import { BrowserRouter } from "react-router-dom";
import RouteIndex from "./router/Routes";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <BrowserRouter>
        <Header />
        <div className="flex-grow">
          <RouteIndex />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

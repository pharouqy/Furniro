import { BrowserRouter } from "react-router-dom";
import RouteIndex from "./router/Routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "@/common/components/atoms/Toast";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="ds-skip-link">
        Skip to main content
      </a>
      <BrowserRouter>
        <Header />
        <div id="main-content" className="flex-grow">
          <RouteIndex />
        </div>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
};

export default App;

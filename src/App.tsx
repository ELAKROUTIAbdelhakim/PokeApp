import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/molecules/Navbar";
import Footer from "./components/organisms/Footer";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-6">
        <AppRoutes />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

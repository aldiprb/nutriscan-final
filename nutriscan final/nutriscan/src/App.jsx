import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NutriProvider } from "./context/NutriContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import BMICheck from "./pages/BMICheck";
import FoodLog from "./pages/FoodLog";
import Recommendation from "./pages/Recommendation";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <NutriProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bmi" element={<BMICheck />} />
            <Route path="/log" element={<FoodLog />} />
            <Route path="/rekomendasi" element={<Recommendation />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </NutriProvider>
  );
}

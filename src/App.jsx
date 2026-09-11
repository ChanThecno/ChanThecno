import { BrowserRouter, Routes, Route } from "react-router-dom";

import Root from "./page/Root.jsx";
import Home from "./page/Home.jsx";
import ChanThecno from "./chanthecnoai/ChanThecnoAi.jsx"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ChanThecnoAi" element={<ChanThecno />} />
      </Routes>
    </BrowserRouter>
  );
}

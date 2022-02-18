import { BrowserRouter, Route, Routes } from "react-router-dom";
import Item from "./components/Item";
import Home from "./routes/Home";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item" element={<Item />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

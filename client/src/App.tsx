import logo from "./assets/logo.svg";
import vanGanLogo from "./assets/vanGanLogo.svg";
import "./App.css";

import { Home, CreatePost } from "./pages";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-blue-500">
        <Link to="/">
          <div className="flex items-end justify-center">
            <img src={vanGanLogo} alt={"logo"} className="w-40" />
            <span className="text-xs mx-1">with</span>
            <img src={logo} alt={"logo"} className="w-20 object-contain" />
          </div>
        </Link>
        <Link
          to="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

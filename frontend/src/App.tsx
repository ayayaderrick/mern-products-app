import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "./components/Home";
import CreateProduct from "./components/CreateProduct";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateProduct />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

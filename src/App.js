
import { RouterProvider } from "react-router";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ShoppingCart from "./components/ShoppingCart";
import { router } from "./components/router/Router";

//// clone

function App() {
  return (
    <div>
      check
      <RouterProvider router={router} />

     {/* <Navbar/> */}
      {/* practice of git by ritesh */}
    </div>
  );
}

export default App;

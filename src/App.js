
import { RouterProvider } from "react-router";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ShoppingCart from "./components/ShoppingCart";
import { router } from "./components/router/Router";


function App() {
  return (
    <div>
      <RouterProvider router={router} />
    
     {/* <Navbar/> */}
     
    </div>
  );
}

export default App;

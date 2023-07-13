import { createBrowserRouter, createRoutesFromElements, Route }  from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "../Home";



export const router=createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route path="/" element={<Home/>}/>
        </Route>
    )
)
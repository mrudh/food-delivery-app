import React,{Suspense, lazy} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
//import Grocery from "./components/Grocery";


//chunking, code splitting, lazy loading, dynamic bundling, on demand loading

const Grocery = lazy(() => import("./components/Grocery"));

const styleCard = {
    backgroundColor: "#f0f0f0"
}

const AppLayout = () => {
    return <div className="app">
        <Header/>
        <Outlet/>
    </div>
};

const appRouter = createBrowserRouter([
    {
        path: "/", 
        element: <AppLayout/>,
        children: [
            {
                path: "/",
                element: <Body/>,
            },
            {
                path: "/about", 
                element: <About/>,
            },
            {
                path: "/contact",
                element: <Contact/>,
            },
            {
                path: "/grocery",
                element: (
                    <Suspense fallback = {<h1>Loading...</h1>}>
                        <Grocery/>
                    </Suspense>
                )
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu/>,
            },
        ],
        errorElement: <Error/>,
    },
])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);
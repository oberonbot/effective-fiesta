import React from "react";

import Navigation from "./Components/Navigation";
import Footer from "./Components//Footer";

import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";

import Gallery from "./pages/Gallery/Gallery";
import Artist from "./pages/Gallery/Artist";
import Artwork from "./pages/Gallery/Artwork";

import Blog from "./pages/Blog/Blog";
import BlogLogin from "./pages/Blog/Login";
import BlogRegister from "./pages/Blog/Register";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./CSS/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/aboutme", element: <AboutMe /> },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  {
    path: "/blog",
    element: <Blog main="home" />,
  },
  {
    path: "/blog/login",
    element: <BlogLogin />,
  },
  {
    path: "/blog/register",
    element: <BlogRegister />,
  },
  {
    path: "/blog/write",
    element: <Blog main="write" />,
  },
  {
    path: "/blog/:id",
    element: <Blog main="single" />,
  },

  { path: "/gallery/artist/:id", element: <Artist /> },
  { path: "/gallery/artwork/:id", element: <Artwork /> },
]);

function App() {
  let output;
  output = (
    <div className="app">
      <Navigation />
      <main>
        <RouterProvider router={router} />
        <Footer />
      </main>
    </div>
  );

  return output;
}

export default App;

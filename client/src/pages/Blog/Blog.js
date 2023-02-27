import React from "react";
import Navbar from "../../Components/Blog/Navbar";
import Footer from "../../Components/Blog/Footer";
import Home from "./Home";
import Write from "./Write";
import Single from "./Single";

function Blog(props) {
  let main;
  if (props.main === "home") {
    main = <Home />;
  }

  if (props.main === "write") {
    main = <Write />;
  }

  if (props.main === "single") {
    main = <Single />;
  }
  return (
    <div className="blog">
      <div className="container">
        <Navbar />
        {main}
        <Footer />
      </div>
    </div>
  );
}

export default Blog;

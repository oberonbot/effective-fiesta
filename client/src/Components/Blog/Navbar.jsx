import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Logo from "../../images/logo.png";

const Navbar = () => {
  const { currentBlogUser, blogLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    navigate("/blog");
    await blogLogout();
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/blog">
            <img src={Logo} alt="logo"></img>
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/blog/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/blog/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/blog/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/blog/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/blog/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/blog/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <span>{currentBlogUser?.username}</span>
          {currentBlogUser ? (
            <>
              <span onClick={handleLogout}>Logout</span>
              <span className="write">
                <Link className="link" to="/blog/write">
                  Write
                </Link>
              </span>
            </>
          ) : (
            <Link className="link" to="/blog/login">
              <h5>Login</h5>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

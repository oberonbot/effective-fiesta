import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/blog/?cat=${cat}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu">
      <h1>other posts u may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../../upload/blog/${post.img}`} alt="" />
          <h2>{post.title}</h2>

          <button>
            <Link className="link" to={`/post/${post.id}`}>
              Read More
            </Link>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Menu;

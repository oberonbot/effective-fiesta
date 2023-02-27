import React, { useContext, useEffect, useState } from "react";
import Edit from "../../images/edit.png";
import Delete from "../../images/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../../Components/Blog/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../../context/authContext";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];
  const { currentBlogUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/blog/${postId}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/blog/${postId}`);
      navigate("/blog");
    } catch (error) {
      console.log(error);
    }
  };

  let classifiedButtons;
  if (currentBlogUser === null || currentBlogUser.username !== post.username) {
    classifiedButtons = <></>;
  } else {
    classifiedButtons = (
      <div className="edit">
        <Link to={`/blog/write?edit=2`} state={post}>
          <img src={Edit} alt="" />
        </Link>
        <img onClick={handleDelete} src={Delete} alt="" />
      </div>
    );
  }
  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/blog/${post.postImg}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {classifiedButtons}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
      </div>

      <Menu cat={post.cat}></Menu>
    </div>
  );
};

export default Single;

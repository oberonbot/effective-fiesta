import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentGalleryUser, setCurrentGalleryUser] = useState(
    JSON.parse(localStorage.getItem("galleryUser")) || null
  );
  const [currentBlogUser, setCurrentBlogUser] = useState(
    JSON.parse(localStorage.getItem("blogUser")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("/api/gallery/login", inputs);
    setCurrentGalleryUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post("/api/gallery/logout");
    setCurrentGalleryUser(null);
  };

  const blogLogin = async (inputs) => {
    const res = await axios.post("/api/blog/login", inputs);
    setCurrentBlogUser(res.data);
  };

  const blogLogout = async (inputs) => {
    await axios.post("/api/blog/logout");
    setCurrentBlogUser(null);
  };

  useEffect(() => {
    localStorage.setItem("galleryUser", JSON.stringify(currentGalleryUser));
    localStorage.setItem("blogUser", JSON.stringify(currentBlogUser));
  }, [currentGalleryUser, currentBlogUser]);

  return (
    <AuthContext.Provider
      value={{
        currentGalleryUser,
        currentBlogUser,
        login,
        logout,
        blogLogin,
        blogLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

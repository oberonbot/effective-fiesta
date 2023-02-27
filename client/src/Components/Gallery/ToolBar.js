// import { Button } from "bootstrap";
import Button from "react-bootstrap/Button";
import { React, useContext } from "react";
import Form from "react-bootstrap/Form";
import NewArtist from "./NewArtist";
import NewArtwork from "./NewArtwork";
import EditArtist from "./EditArtist";
import EditArtwork from "./EditArtwork";
import { AuthContext } from "../../context/authContext";
import Login from "./Login";
import {
  Search,
  Shuffle,
  Tags,
  PersonXFill,
  Trash3,
} from "react-bootstrap-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ToolBarButton(props) {
  let href = props.href;
  let title = props.title;
  let variant = "outline-secondary";
  if (title === "Shuffle") {
    title = <Shuffle></Shuffle>;
  }
  if (title === "Categories") {
    title = <Tags></Tags>;
  }
  if (title === "Remove Artist") {
    variant = "outline-danger";
    title = <PersonXFill></PersonXFill>;
  }
  if (title === "Remove Artwork") {
    variant = "outline-danger";
    title = <Trash3></Trash3>;
  }

  return (
    <div>
      <Button
        variant={variant}
        className="toolbar-button"
        href={href}
        disabled={props.disabled}
      >
        {title}
      </Button>
    </div>
  );
}

function ToolBarSearchBar(props) {
  return (
    <Form className="toolbar-searchbar">
      <Form.Label></Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter the Artist or Artwork"
        disabled
      />
      <Button variant="outline-secondary" type="submit" disabled={true}>
        <Search></Search>
      </Button>
    </Form>
  );
}
function ToolBar(props) {
  const { currentGalleryUser, logout } = useContext(AuthContext);
  const type = props.type;
  const id = props.id;
  const artistPosterId = props.artistPosterId;
  const artworkPosterId = props.artworkPosterId;
  let output;

  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await axios.delete(`/gallery/${type}/${id}`);
      navigate("/gallery");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    navigate("/gallery");
    await logout();
  };

  if (type === "gallery") {
    // If not logged in at all
    if (currentGalleryUser === null) {
      output = (
        <div className="toolbar">
          <Login />
          <ToolBarSearchBar />
          <ToolBarButton title="Categories" disabled={true} />
        </div>
      );
    } else {
      // If already logged in
      output = (
        <div className="toolbar">
          <NewArtist title="New Artist" />
          <NewArtwork title="New Artwork" />
          <ToolBarSearchBar />
          <ToolBarButton title="Categories" disabled={true} />
          <Button
            variant="outline-danger"
            className="toolbar-button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      );
    }
  }

  if (type === "artist") {
    // If logged in as the poster this artist
    if (
      currentGalleryUser !== null &&
      currentGalleryUser.id === artistPosterId
    ) {
      output = (
        <div className="toolbar">
          <EditArtist title="Edit Artist" />
          <NewArtwork title="Add Artwork" />
          <ToolBarSearchBar />
          <ToolBarButton title="Categories" disabled={true} />
          <div onClick={handleDelete}>
            <ToolBarButton title="Remove Artist" />
          </div>
          <Button
            variant="outline-danger"
            className="toolbar-button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      );
    } else if (currentGalleryUser === null) {
      // If not logged in at all
      output = (
        <div className="toolbar">
          <Login />
          <ToolBarSearchBar />
          <ToolBarButton title="Categories" disabled={true} />
        </div>
      );
    } else {
      // If logged in as a normal user
      output = (
        <div className="toolbar">
          <NewArtwork title="Add Artwork" />
          <ToolBarSearchBar />
          <ToolBarButton title="Categories" disabled={true} />
          <Button
            variant="outline-danger"
            className="toolbar-button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      );
    }
  }

  if (type === "artwork") {
    // If logged in as poster of artist or poster of artwork
    if (
      currentGalleryUser != null &&
      (currentGalleryUser.id === artistPosterId ||
        currentGalleryUser.id === artworkPosterId)
    ) {
      output = (
        <div className="toolbar-artwork">
          <EditArtwork title="Edit Artwork" />
          <div onClick={handleDelete}>
            <ToolBarButton title="Remove Artwork" />
          </div>
          <Button
            variant="outline-danger"
            className="toolbar-button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      );
    } else {
      // If not logged in at all
      <></>;
    }
  }
  return output;
}

export default ToolBar;

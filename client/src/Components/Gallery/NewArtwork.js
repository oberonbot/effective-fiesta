import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Image } from "react-bootstrap-icons";
import CreateableSelect from "react-select/creatable";
import axios from "axios";
import Select from "react-select";

function NewArtwork(props) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState([]);
  const [artist, SetArtist] = useState("");
  const [artistOptions, setArtistOptions] = useState([]);
  const [artworkOptions, setArtworkOptions] = useState([]);
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [intro, setIntro] = useState("");
  const [other, setOther] = useState("");
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get("/gallery/artist");
          setArtistOptions(res.data.artistsArray);
          setArtworkOptions(res.data.tagsArray);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [isLoading]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setImg(selectedFile);

    const reader = new FileReader();
    reader.onload = function () {
      setPreviewSrc(reader.result);
    };

    reader.readAsDataURL(selectedFile);
  };

  // window shows and closes
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", img);
      const res = await axios.post("/gallery/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (img === null) {
      alert("This is an app about photos, so please upload one to continue :)");
    } else {
      const imgUrl = await upload();
      try {
        const data = {
          title: title,
          artist: artist,
          place: place,
          intro: intro,
          tags: selected,
          other: other,
          img: img ? imgUrl : "",
          time: time,
        };
        await axios.post("/gallery/artwork", data);
        handleClose();
      } catch (error) {
        console.log(error);
      }
      handleClose();
      window.location.reload();
    }
  };

  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={handleShow}
        className="toolbar-button"
      >
        {props.title}
      </Button>

      <Modal size="" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Artwork</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="new-artwork">
            <div className="photo-upload">
              <input
                style={{ display: "none" }}
                type="file"
                id="img"
                name=""
                onChange={handleFileChange}
              />
              {previewSrc ? (
                <label htmlFor="img">
                  <img src={previewSrc} alt="Preview" htmlFor="img" />
                </label>
              ) : (
                <label
                  variant="secondary"
                  className="upload-artwork"
                  htmlFor="img"
                >
                  <Image size={50} color="white" />
                  <p>Upload artwork</p>
                </label>
              )}
            </div>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <div>Select Artist</div>
              <div className="select">
                <Select
                  isSearchable
                  options={artistOptions}
                  className="basic-multi-select"
                  classNamesPrefix="select"
                  onChange={SetArtist}
                />
              </div>

              <div>Add Tags</div>
              <div className="select">
                <CreateableSelect
                  isMulti
                  isSearchable
                  options={artworkOptions}
                  onChange={setSelected}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Create Time</Form.Label>
                <Form.Control
                  name="time"
                  type="date"
                  onChange={(e) => setTime(e.target.value)}
                />
              </Form.Group>

              <div className="artist-intro">
                <Form.Group className="mb-3">
                  <Form.Label>Exhibition Place</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setPlace(e.target.value)}
                  />
                </Form.Group>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Introduction</Form.Label>
                <Form.Control
                  className="text-area"
                  as="textarea"
                  onChange={(e) => setIntro(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Other</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setOther(e.target.value)}
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-secondary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewArtwork;

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { PencilSquare } from "react-bootstrap-icons";
import CreateableSelect from "react-select/creatable";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Select from "react-select";

function EditArtwork() {
  const [show, setShow] = useState(false);

  const [artist, setArtist] = useState("");
  const [selectedArtwork, setSelectedArtwork] = useState([]);
  const [artistOptions, setArtistOptions] = useState([]);
  const [artworkOptions, setArtworkOptions] = useState([]);
  const [img, setImg] = useState(null);
  const [imgShow, setImgShow] = useState("");
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [intro, setIntro] = useState("");
  const [other, setOther] = useState("");
  const [time, setTime] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const artworkId = location.pathname.split("/")[3];

  useEffect(() => {
    if (!isLoading) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(`/api/gallery/artwork/${artworkId}`);
          console.log(res.data);
          setTitle(res.data.title);
          setArtist(res.data.artist);
          setPlace(res.data.place);
          setIntro(res.data.intro);
          setSelectedArtwork(res.data.tags);
          setImgShow(res.data.img);
          setTime(res.data.time);
          setOther(res.data.other);
          setArtistOptions(res.data.artistOptions);
          setArtworkOptions(res.data.artworkOptions);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [isLoading, artworkId]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setImg(selectedFile);
  };

  // window shows and closes
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  // const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", img);
      const res = await axios.post("/api/gallery/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imgUrl;
    if (img !== null) {
      imgUrl = await upload();
    } else {
      imgUrl = imgShow;
    }
    try {
      const data = {
        title: title,
        artist: artist,
        place: place,
        intro: intro,
        tags: selectedArtwork,
        other: other,
        img: imgUrl,
        time: time,
      };
      await axios.put(`/api/gallery/artwork/${artworkId}`, data);
      handleClose();
    } catch (error) {
      console.log(error);
    }
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={handleShow}
        className="toolbar-button"
      >
        <PencilSquare></PencilSquare>
      </Button>

      <Modal size="" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Artwork</Modal.Title>
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
              <label htmlFor="img">
                <img src={`../../upload/gallery/${imgShow}`} alt=""></img>
              </label>
            </div>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  value={title}
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
                  value={artist}
                  onChange={setArtist}
                />
              </div>

              <div>Add Tags</div>
              <div className="select">
                <CreateableSelect
                  isMulti
                  isSearchable
                  options={artworkOptions}
                  onChange={setSelectedArtwork}
                  value={selectedArtwork}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Create Time</Form.Label>
                <Form.Control
                  name="time"
                  type="date"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </Form.Group>

              <div className="artist-intro">
                <Form.Group className="mb-3">
                  <Form.Label>Exhibition Place</Form.Label>
                  <Form.Control
                    type="text"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                  />
                </Form.Group>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Introduction</Form.Label>
                <Form.Control
                  className="text-area"
                  as="textarea"
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Other</Form.Label>
                <Form.Control
                  type="text"
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outline-secondary" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditArtwork;

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CreateableSelect from "react-select/creatable";
import axios from "axios";
import { useLocation } from "react-router-dom";

function EditArtist(props) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState([]);
  const [img, setImg] = useState(null);
  const [imgShow, setImgShow] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [nation, setNation] = useState("");
  const [intro, setIntro] = useState("");
  const [artistTags, setArtistTags] = useState([]);
  const [artistPosterId, setArtistPosterId] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const artistId = location.pathname.split("/")[3];

  useEffect(() => {
    if (!isLoading) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(`/api/gallery/artist/${artistId}`);
          setName(res.data.name);
          setBirth(res.data.birth);
          setNation(res.data.nation);
          setIntro(res.data.intro);
          setSelected(res.data.tags);
          setImgShow(res.data.img);
          setArtistTags(res.data.artistTags);
          setArtistPosterId(res.data.artistPosterId);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [isLoading, artistId]);

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
        artistPosterId: artistPosterId,
        name: name,
        birth: birth,
        nation: nation,
        intro: intro,
        tags: selected,
        img: imgUrl,
      };

      await axios.put(`/api/gallery/artist/${artistId}`, data);
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
        {props.title}
      </Button>

      <Modal size="" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Artist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="new-artist">
              <div className="basic-info">
                <div className="short-input">
                  <Form.Group className="mb-3">
                    <Form.Label>Artist Name</Form.Label>
                    <Form.Control
                      type="text"
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      name="birth"
                      type="date"
                      value={birth}
                      onChange={(e) => setBirth(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control
                      name="nation"
                      type="text"
                      value={nation}
                      onChange={(e) => setNation(e.target.value)}
                    />
                  </Form.Group>
                </div>
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
              <div>Add Tags</div>
              <div className="select">
                <CreateableSelect
                  isMulti
                  isSearchable
                  options={artistTags}
                  value={selected}
                  onChange={setSelected}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
              <Form.Group>
                <Form.Label>Introduction</Form.Label>
                <Form.Control
                  className="text-area"
                  as="textarea"
                  name="intro"
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                />
              </Form.Group>
            </div>
          </Form>
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

export default EditArtist;

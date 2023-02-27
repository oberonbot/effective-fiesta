import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { PersonBoundingBox } from "react-bootstrap-icons";
import CreateableSelect from "react-select/creatable";
import axios from "axios";

function NewArtist(props) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState([]);
  const [img, setImg] = useState(null);
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [nation, setNation] = useState("");
  const [intro, setIntro] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [artistTags, setArtistTags] = useState([]);
  const [previewSrc, setPreviewSrc] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(`/gallery/artistTags`);
          setArtistTags(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [artistTags, isLoading]);

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

  // const navigate = useNavigate();

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
          name: name,
          birth: birth,
          nation: nation,
          intro: intro,
          tags: selected,
          img: img ? imgUrl : "",
        };
        await axios.post("/gallery/artist", data);
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
          <Modal.Title>Create New Artist</Modal.Title>
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
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      name="birth"
                      type="date"
                      onChange={(e) => setBirth(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control
                      name="nation"
                      type="text"
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
                {previewSrc ? (
                  <label htmlFor="img">
                    <img src={previewSrc} alt="Preview" htmlFor="img" />
                  </label>
                ) : (
                  <label className="upload-portrait" htmlFor="img">
                    <PersonBoundingBox size={50} color="white" />
                    <p>Upload photo</p>
                  </label>
                )}
              </div>
              <div>Add Tags</div>
              <div className="select">
                <CreateableSelect
                  isMulti
                  isSearchable
                  options={artistTags}
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
                  onChange={(e) => setIntro(e.target.value)}
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-secondary" onClick={handleSubmit}>
            Sumbit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewArtist;

import express from "express";
import galleryRoutes from "./routes/gallery/galleryRoutes.js";
import blogRoutes from "./routes/blog/blogRoutes.js";
import session from "express-session";
import multer from "multer";
import { initTags } from "./data/tag.js";

const app = express();

app.use(express.json());
app.use(
  session({
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (process.env.NODE_ENV === "production") {
      cb(null, "/var/www/html/upload/gallery");
    } else {
      console.log("good");
      cb(null, "../client/public/upload/gallery");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const blogStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (process.env.NODE_ENV === "production") {
      cb(null, "/var/www/html/upload/blog");
    } else {
      cb(null, "../client/public/upload/gallery");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
const blogUpload = multer({ storage: blogStorage });

app.post("/api/gallery/upload", upload.single("file"), function (req, res) {
  if (!req.session.galleryUserId) {
    return res.status(400).json("Error: Not authenticated!");
  }

  const file = req.file;
  console.log("received file: " + file.filename);
  res.status(200).json(file.filename);
});

app.post("/api/blog/upload", blogUpload.single("file"), function (req, res) {
  if (!req.session.blogUserId) {
    return res.status(400).json("Error: Not authenticated!");
  }
  const file = req.file;
  console.log("received file: " + file.filename);
  res.status(200).json(file.filename);
});

// app.get("/api/upload/blog/undefined", function (req, res) {});
app.get("/api/upload/gallery/null", function (req, res) {});

app.use("/api/gallery", galleryRoutes);
app.use("/api/blog", blogRoutes);

try {
  initTags();
} catch (error) {
  console.log(error);
}

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 8000;
const server = app.listen(port, function () {
  console.log("Server listening on port " + port);
});

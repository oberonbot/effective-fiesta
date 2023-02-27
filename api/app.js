import express from "express";
import galleryRoutes from "./routes/gallery/galleryRoutes.js";
import blogRoutes from "./routes/blog/blogRoutes.js";
import session from "express-session";
import multer from "multer";

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
    cb(null, "../client/public/upload/gallery");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const blogStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload/blog");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
const blogUpload = multer({ storage: blogStorage });

app.post("/gallery/upload", upload.single("file"), function (req, res) {
  if (!req.session.galleryUserId) {
    return res.status(400).json("Error: Not authenticated!");
  }

  const file = req.file;
  res.status(200).json(file.filename);
});

app.post("/blog/upload", blogUpload.single("file"), function (req, res) {
  if (!req.session.blogUserId) {
    return res.status(400).json("Error: Not authenticated!");
  }
  const file = req.file;
  res.status(200).json(file.filename);
});

// app.get("/api/upload/blog/undefined", function (req, res) {});
app.get("/upload/gallery/null", function (req, res) {});

app.use("/gallery", galleryRoutes);
app.use("/blog", blogRoutes);

app.listen(8800, () => console.log("Connected"));

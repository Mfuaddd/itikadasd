import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/");
    cb(null, uuidv4() + "." + ext[1]);
  },
});

export const upload = multer({ storage: storage });

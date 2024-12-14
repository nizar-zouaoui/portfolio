import * as csvParserController from "controllers/csv-parser";
import { router } from "init";
import multer from "multer";
import path from "path";
import * as csvParserValidator from "validators/csv-parser";

const BASE_ROUTE = "/csv-parser";

const uploadsPath = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  `${BASE_ROUTE}/`,
  <any>upload.single("file"),
  csvParserValidator.validateParseCsv,
  csvParserController.parseCsv
);
export default router;

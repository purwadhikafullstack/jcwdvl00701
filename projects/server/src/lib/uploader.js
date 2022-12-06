const {nanoid} = require("nanoid");

const multer = require("multer");

const fileUploader = ({destinationFolder = "", prefix = "POST", fileType = "image"}) => {
  //storage config mengatur tujuan folder disimpan
  // dan nama filenya
  const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../public/${destinationFolder}`);
    },
    filename: (req, file, cb) => {
      const fileExtension = file.mimetype.split("/")[1];
      // image/jpeg
      // index = jpeg

      // "POST_qwer1234566.jpeg"
      const filename = `${prefix}_${nanoid()}.${fileExtension}`;

      cb(null, filename);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] != fileType) {
      return cb(null, false);
    }

    return cb(null, true);
  }

  return multer({storage: storageConfig, fileFilter: fileFilter});
};

module.exports = fileUploader;

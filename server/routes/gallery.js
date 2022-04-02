var express = require("express");
// const multer = require('multer');
const Photo = require("../models/gallery");
// const fs = require('fs')
// const path = require('path');

var router = express.Router();

// const MIME_TYPE_MAP = {
//   'image/png': 'png',
//   'image/jpeg': 'jpg',
//   'image/jpg': 'jpg'
// }


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const val = MIME_TYPE_MAP[file.mimetype];
//     if (!val) {
//       console.log("error no mime type")
//     }
//     cb(null, "server/images");
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname.toLowerCase().split(' ').join('-');
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     cb(null, name + '-' + Date.now() + '.' + ext);
//   }
// });

/*************************GET */
router.get("/", (req, res, next) => {
    Photo.find()
      .then((photos) => {
        //Makes no sense (get the documents from database)
        res.status(200).json({ photo: photos });
      })
      .catch((error) => {
        if (error) {
          res.status(500).json({
            photoGetError: error,
          });
        }
      });
  });
/*************************GET */

/*************************POST */
// multer(storage).single('image') fs.readFileSync(path.join(__dirname + '/server/images/' + req.file.filename)
router.post("/", (req, res, next) => {
  const photo = new Photo({
    id: req.body.id,
    blog: req.body.blog
});

  photo
    .save()
    .then((createdphoto) => {
      res.status(201).json({
        mes: "photo added successfully",
        photo: createdphoto,
      });
    })
    .catch((error) => {
      res.status(500).json({
        mes: "An error occurred",
        error: error,
      });
    });
});
/*************************POST */

/*************************PUT */
router.put("/:id", (req, res, next) => {
  Photo.findOne({ id: req.params.id })
    .then((photo) => {
      photo.id = req.body.id;
      photo.blog = req.body.blog
      console.log('new photo', photo);

      Photo.updateOne({ id: req.params.id }, photo)
        .then((result) => {
          res.status(204).json({
            mes: "photo updated successfully",
            result: result
          });
        })
        .catch((error) => {
          res.status(500).json({
            mes: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        mes: "photo not found.",
        error: { mes: "photo not found" },
      });
    });
});
/*************************PUT */

/*************************DELETE */

router.delete("/:id", (req, res, next) => {
  Photo.findOne({ id: req.params.id })
    .then((photo) => {
      photo.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            mes: "photo deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            mes: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        mes: "photo not found.",
        error: { mes: "photo not found" },
      });
    });
});
/*************************DELETE */

module.exports = router;

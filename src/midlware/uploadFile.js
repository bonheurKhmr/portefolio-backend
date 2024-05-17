const multer = require("multer")
const path = require("path")

const f_storage = (destination) => {
    const storage = multer.diskStorage({
        destination: './public/upload/' + destination,
        filename: (req, file, cb) => {
            return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        }
    })

    return storage
}

const uploadProfile = multer({
    storage: f_storage('images'),
    limits: {
        fileSize: 900000
    }
})

const uploadProjectFile = multer({
    storage: f_storage('file_project'),
    limits: {
        fileSize: 9000000
    }
})

module.exports = { uploadProfile, uploadProjectFile }
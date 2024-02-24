const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cd) => {
		cd(null, './public/uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
	}
});

const uploads = multer({
	storage,
	limits: {
		fileSize: 1024 * 1024 * 2
	},
	fileFilter: (req, file, cd) => {
		console.log(file);

		const type = /jpg|png|jpeg/;
		const fileExt = type.test(path.extname(file.originalname).toLowerCase());
		const mimetype = type.test(file.mimetype);

		if (fileExt && mimetype) {
			cd(null, true);
		} else {
			cd(new Error('only png,jpg,jpeg  supported'));
		}
	}
});

module.exports = uploads;

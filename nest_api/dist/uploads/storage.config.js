"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const multer_1 = require("multer");
exports.storage = (0, multer_1.diskStorage)({
    destination: 'images',
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
//# sourceMappingURL=storage.config.js.map
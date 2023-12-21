import { diskStorage } from "multer";

/**
 * Configuration for file storage.
 */
export const storage = diskStorage({
    destination: 'images',
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
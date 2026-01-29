import { Router, Request, Response } from 'express';
import { uploads } from '../middleware/upload.middleware';

const router = Router();

// POST /api/upload-profile-image
router.post('/upload-profile-image', uploads.single('profile_image'), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }
    // You can return the file path or URL if needed
    res.status(200).json({
        success: true,
        message: 'Profile image uploaded successfully.',
        file: {
            filename: req.file.filename,
            path: `/uploads/${req.file.filename}`,
        },
    });
});

export default router;
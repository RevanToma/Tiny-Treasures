import express from 'express';
import * as geocodeController from '../controllers/geocodeController';

const router = express.Router();

router.get('/coords/lat/:lat/lng/:lng', geocodeController.getCityFromCoords);
router.get('/address/:address', geocodeController.getCityFromAddress);

export default router;

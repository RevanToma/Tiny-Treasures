import express from 'express';
import * as enumController from '../controllers/enumController';

const router = express.Router();

router.get('/', enumController.getEnums);

export default router;

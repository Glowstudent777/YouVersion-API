import express, {Router} from 'express'

// Router
const router: Router = express.Router();

const status = require('./status');
const verse = require('./verse/verse');

router.use("/status", status);
router.use("/verse", verse);

export default router;

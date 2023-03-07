import express, {Router} from 'express'

// Router
const router: Router = express.Router();

// Api versions
import v1 from './v1/index';

// Directing versions
router.use('/v1', v1);

export default router;

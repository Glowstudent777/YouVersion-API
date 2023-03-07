import express, {Request, Response, Router} from 'express'

// Router
const router: Router = express.Router();

router.get("/",(req: Request, res: Response)=>{
    res.sendStatus(200);
})
module.exports=router;

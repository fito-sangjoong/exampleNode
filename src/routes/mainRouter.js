import express from "express";
const mainRouter = express.Router();

mainRouter.get('/' , (req,res,next) => {
    res.end('Hello World');
});


export default mainRouter;
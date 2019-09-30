import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import mainRouter from "./routes/mainRouter";

const app = express();

app.set('port', 1001);

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/',mainRouter);


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(process.env.PORT);
    console.log(app.get('port'), '번 포트에서 대기중');
});

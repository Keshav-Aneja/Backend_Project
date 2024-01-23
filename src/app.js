import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" })); // We are using this, because sometimes in url the data may come in different way like some times q=keshav+aneja, sometimes they use q=keshav%20%aneja, etc so it handles all that, extended allows us to use nested objects (most of the cases we dont use this)
app.use(express.static("public")); //sometimes we want to store some files or folders, so to store public asstes, we can name the folder anything
app.use(cookieParser());

// Routes import
import userRouter from "./routes/user.routes.js";
// we can only give our own name to an import statement when it is exporting as default
//routes declaration
app.use("/api/v1/users", userRouter);
export { app };

import { Application, Router } from "express";
import { upload, captureJsonFileUpload } from "../controllers/upload.controller";
import initialHomePageData from "../controllers/home.controller";

export default (app: Application)  => {
    const router = Router()

    router.post('/upload', upload.single('file'), captureJsonFileUpload);

    router.get("/home", initialHomePageData);

    app.use("/api/v1/", router)
}
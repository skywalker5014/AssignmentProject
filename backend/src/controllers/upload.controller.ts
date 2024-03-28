import { Request, Response } from "express";
import multer from "multer";
import { Node } from "../configs/db.config";
import { NodeInterface } from "../constants/node";
import jsonFileDataValidator from "../utils/validator";

// setting up multer to capture blob data in ram
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//main controller function for capturing the file upload
async function  captureJsonFileUpload(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).json({ message: "No File Uploaded" });
  }

  if (req.file.mimetype !== "application/json") {
    return res.status(400).json({ message: "Only Json file allowed" });
  }

  const jsonFileData = req.file.buffer.toString();
  const parsedData = JSON.parse(jsonFileData);

  let runCheck

//checking if the json file content is in the json array format
  if (Array.isArray(parsedData)) {
    runCheck = jsonFileDataValidator(parsedData)
    if(runCheck){
        await Node.deleteMany()
            parsedData.map(async (item: NodeInterface) => {
              const newNode = new Node(item);
              await newNode.save();
            });
    }
  } else {
    runCheck = false
  }

  try {
    if (runCheck) {
      res.status(200).json({ message: "data saved successfully" });
    } else {
      res.status(400).json({ message: "false data sent" });
    }
  } catch (error) {
    res.status(400).json({ message: "parsing error" });
  }
};

export { upload, captureJsonFileUpload };

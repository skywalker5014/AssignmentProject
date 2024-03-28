import { NodeInterface } from "../constants/node";
import { Request, Response } from "express";
import { Node } from "../configs/db.config";

//for initial home page load
async function initialHomePageData(req: Request, res: Response) {
    const savedTree = await Node.find().select("name parentName childrenNames -_id")
    if(savedTree.length === 0){
        return res.status(200).json({"message" : "No data available"})
    }

    return res.status(200).json(savedTree)    
}

export default initialHomePageData
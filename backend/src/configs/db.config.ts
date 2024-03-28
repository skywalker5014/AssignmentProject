import { Schema, model, connect} from "mongoose";
import { NodeInterface } from "../constants/node";

const NodeSchema = new Schema<NodeInterface>({
    name: {type: String},
    parentName: {type: String || null},
    childrenNames: {type: [String]}
})

const Node = model<NodeInterface>("Node", NodeSchema)

function connectDb(url: string | undefined){
        if(url){
            connect(url)
            .then(() => console.log("[Database] : Connected to MongoDB"))
            .catch((error) => console.log(`[Database] : 'Couldnt connect to MongoDB'\n error-info:\n${error}`))
    
        } else {
            console.log("[database] : error connecting to database, no connection url provided")
        }
}

export {Node, connectDb}
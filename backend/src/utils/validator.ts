import { isNodeInterface, calculateTreeDepth, calculateMaxNodesPerDepth, validateChildrenPerNode } from "./helperFunctions";

/**
 * validate the contents of the parsed json file
 * this will validate according to the provided assumptions and constraints provided in the assignment:
 * - The JSON file will invariably be an array of objects, each containing three keys: **`name`**, **`parentName`**, **`childrenNames`**.
 * - Only one object in the array will have **`parentName`** as null.
 * - Each node can have up to four children.
 * - The tree's maximum depth will not exceed five levels.
 * - No more than fifteen nodes will be present at the same level.
 * @param parsedDataInput 
 * @returns boolean
 */
function jsonFileDataValidator(parsedDataInput: any[]) {
    let notFalseData = true;
    let parentNullCounter = 0;
    let treeDepth = 0;

    //this will validate following assumptions: 
    // 1: only one object's parentName will be null
    // 2: each object in the array obeys nodes schema
    for (let i = 0; i < parsedDataInput.length; i++) {
        if(parentNullCounter <= 1){
            if (!isNodeInterface(parsedDataInput[i])) {
                notFalseData = false;
                break;
              } else if(parsedDataInput[i].parentName === null) {
                if(parentNullCounter < 1) {
                    parentNullCounter += 1 
                } else {
                    notFalseData = false 
                    break;
                }
              }
        } else {
            notFalseData = false
            break;
        }
    }

    //this will validate the following constraints:
    // 1: tree's max depth will not exceed 5 levels 
    // 2: each node will have atmost 4 children
    // 3: max number of nodes per level do not exceed 15
    if(notFalseData){
        const rootNode = parsedDataInput.filter(item => item.parentName === null)
        
        const depth = calculateTreeDepth(
            rootNode.length === 1 ? rootNode[0]["name"] : "", 
            parsedDataInput, 
            0)

        const maxNodePerLevel = calculateMaxNodesPerDepth(parsedDataInput)
        

        treeDepth = Math.max(treeDepth, depth)
        if(treeDepth > 5 || treeDepth === 0){
            console.log("[exception] : max tree depth | src/utils/validator.ts : line 58");
            
            notFalseData = false
        }     

        if(maxNodePerLevel > 15){
            console.log("[exception] : max node per level | src/utils/validator.ts : line 64");
            
            notFalseData = false
        }
        
        if(!validateChildrenPerNode(parsedDataInput)){
            console.log("[exception] : max children per node | src/utils/validator.ts : line 70");
            
            notFalseData = false            
        }

    }

    return notFalseData;
  }

export default jsonFileDataValidator

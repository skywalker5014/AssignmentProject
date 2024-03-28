import { NodeInterface } from "../constants/node";


//validate if an object is of nodeinterface 
function isNodeInterface(obj: any): obj is NodeInterface {
    return (
      typeof obj.name === "string" 
      && (typeof obj.parentName === "string" || obj.parentName === null) 
      && Array.isArray(obj.childrenNames) 
      && obj.childrenNames.every((cname: any) => typeof cname === "string")
    );
  }

//calculate the depth of the provided tree data 
function calculateTreeDepth(nodeName: string, nodes: NodeInterface[], depth: number): number {
    const node = nodes.find(node => node.name === nodeName);
    if (!node) {
        return depth;
    }

    let maxChildDepth = depth;
    for (const childName of node.childrenNames) {
        const childDepth = calculateTreeDepth(childName, nodes, depth + 1);
        maxChildDepth = Math.max(maxChildDepth, childDepth);
    }

    return maxChildDepth;
}

//calculate the max breadth at a depth level
function calculateMaxNodesPerDepth(nodes: NodeInterface[]): number {

    function calculateDepthOfNode(nodeName: string, nodes: NodeInterface[], depth: number = 0): number {
        const node = nodes.find(node => node.name === nodeName);
        if (!node || node.parentName === null) {
            return depth;
        }
        return calculateDepthOfNode(node.parentName, nodes, depth + 1);
    }

    const nodesPerDepth: Record<number, number> = {};
    
    for (const node of nodes) {
        const depth = calculateDepthOfNode(node.name, nodes);
        nodesPerDepth[depth] = (nodesPerDepth[depth] || 0) + 1;
    }

    // console.log(nodesPerDepth);
    
    const maxNodes = Math.max(...Object.values(nodesPerDepth));

    return maxNodes;
}

function validateChildrenPerNode(nodes: NodeInterface[]) : boolean{
    let safeChildrenCount = true
    for (const node of nodes){
        if(node.childrenNames.length > 4){
            safeChildrenCount = false
            break
        }
    }

    return safeChildrenCount
}

export {
    isNodeInterface,
    calculateTreeDepth,
    calculateMaxNodesPerDepth,
    validateChildrenPerNode
}
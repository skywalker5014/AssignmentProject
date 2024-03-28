import { NodeInterface } from "../utils/constants";
import { Tree, TreeNode } from "react-organizational-chart";


const generateTreeNodes = (nodes: NodeInterface[]) => {
 if(nodes.length !== 0){
    return nodes
    .filter((node) => node.parentName === null)
    .map((node, idx) => (
      <Tree lineColor="white" lineWidth="4px" lineBorderRadius="8px" key={idx} label={<div><span className=" border-4 border-black p-1 rounded-md bg-white font-bold shadow-[5px_5px_0px_0px_rgba(109,40,217)]">{node.name}</span></div>}>
        {generateChildNodes(node, nodes)}
      </Tree>
    ));
 }

};

const generateChildNodes = (parent: NodeInterface, nodes: NodeInterface[]) => {
  const children = nodes.filter((node) => node.parentName === parent.name);
  return children.map((child, idx) => (
    <TreeNode key={idx} label={ <div><span className=" border-4 border-black p-1 rounded-md bg-white font-bold shadow-[5px_5px_0px_0px_rgba(109,40,217)]">{child.name}</span></div>}>
      {generateChildNodes(child, nodes)}
    </TreeNode>
  ));
};

const TreeBuilder = ({ nodes }: { nodes: NodeInterface[] }) => {
  return (
    <div>
      <div>{generateTreeNodes(nodes)}</div>
    </div>
  );
};

export default TreeBuilder;

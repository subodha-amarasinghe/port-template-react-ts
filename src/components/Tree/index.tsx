import React from "react";
import "./Tree.css";

export interface TreeNodeData {
  id: string;
  label: string;
  children?: TreeNodeData[];
}

interface TreeNodeProps {
  node: TreeNodeData;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
  return (
    <div className="tree-node">
      <div className="tree-node-content">{node.label}</div>

      {node.children && (
        <div className="tree-children">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

interface TreeProps {
  data: TreeNodeData[];
}

const Tree: React.FC<TreeProps> = ({ data }) => {
  return (
    <div className="tree-root">
      {data.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};

export default Tree;

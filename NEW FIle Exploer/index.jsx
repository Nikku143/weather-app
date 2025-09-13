import React, { useState } from "react";

const initialData = [
  {
    id: 1,
    name: "Documents",
    type: "folder",
    children: [
      { id: 2, name: "Resume.docx", type: "file" },
      { id: 3, name: "Project", type: "folder", children: [] },
    ],
  },
  { id: 4, name: "Photo.jpg", type: "file" },
];

function FileExplorer() {
  const [data, setData] = useState(initialData);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState("file");

  const toggleFolder = (folderId) => {
    const toggle = (nodes) =>
      nodes.map((node) => {
        if (node.id === folderId) node.open = !node.open;
        if (node.children) node.children = toggle(node.children);
        return { ...node };
      });
    setData(toggle(data));
  };

  const addItem = (parentId) => {
    if (!newItemName) return;
    const add = (nodes) =>
      nodes.map((node) => {
        if (node.id === parentId && node.type === "folder") {
          const newNode = {
            id: Date.now(),
            name: newItemName,
            type: newItemType,
            children: newItemType === "folder" ? [] : undefined,
          };
          node.children = [...(node.children || []), newNode];
        } else if (node.children) {
          node.children = add(node.children);
        }
        return { ...node };
      });
    setData(add(data));
    setNewItemName("");
  };

  const renderNodes = (nodes) =>
    nodes.map((node) => (
      <div key={node.id} style={{ marginLeft: 20 }}>
        {node.type === "folder" ? (
          <div>
            <span
              style={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={() => toggleFolder(node.id)}
            >
              {node.open ? "📂" : "📁"} {node.name}
            </span>
            {node.open && node.children && renderNodes(node.children)}
            {node.open && (
              <div style={{ marginLeft: 20, marginTop: 5 }}>
                <input
                  type="text"
                  placeholder="Name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  style={{ marginRight: 5 }}
                />
                <select
                  value={newItemType}
                  onChange={(e) => setNewItemType(e.target.value)}
                  style={{ marginRight: 5 }}
                >
                  <option value="file">File</option>
                  <option value="folder">Folder</option>
                </select>
                <button onClick={() => addItem(node.id)}>Add</button>
              </div>
            )}
          </div>
        ) : (
          <div>📄 {node.name}</div>
        )}
      </div>
    ));

  return (
    <div style={{ padding: 20 }}>
      <h2>React File Explorer</h2>
      {renderNodes(data)}
    </div>
  );
}

export default FileExplorer;

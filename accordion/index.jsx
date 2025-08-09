import React, { useState } from "react";

function AccordionItem({ title, content, isOpen, onClick }) {
  return (
    <div style={styles.item}>
      <div style={styles.header} onClick={onClick}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && <div style={styles.content}>{content}</div>}
    </div>
  );
}

export default function App() {
  const [openIndex, setOpenIndex] = useState(null);

  const data = [
    { title: "Section 1", content: "This is the content of section 1." },
    { title: "Section 2", content: "This is the content of section 2." },
    { title: "Section 3", content: "This is the content of section 3." },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={styles.container}>
      <h2>Accordion Example</h2>
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "30px auto",
    fontFamily: "Arial, sans-serif",
  },
  item: {
    border: "1px solid #ccc",
    marginBottom: "10px",
    borderRadius: "5px",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#f0f0f0",
    padding: "10px 15px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    padding: "10px 15px",
    backgroundColor: "#fff",
  },
};

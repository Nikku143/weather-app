// install recharts using: npm install recharts

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const addTransaction = () => {
    if (!text || !amount) return;
    const newTransaction = {
      id: Date.now(),
      text,
      amount: +amount,
    };
    setTransactions([...transactions, newTransaction]);
    setText("");
    setAmount("");
  };

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income + expense;

  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: Math.abs(expense) },
  ];

  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h2>💰 Expense Tracker</h2>
      <h3>Balance: ₹{balance}</h3>
      <p style={{ color: "green" }}>Income: ₹{income}</p>
      <p style={{ color: "red" }}>Expense: ₹{Math.abs(expense)}</p>

      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="Enter amount (+income / -expense)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ padding: "8px", marginRight: "10px", width: "300px" }}
        />
        <button onClick={addTransaction} style={{ padding: "8px 16px" }}>
          Add
        </button>
      </div>

      <h3>Transactions</h3>
      <ul>
        {transactions.map((t) => (
          <li key={t.id} style={{ color: t.amount > 0 ? "green" : "red" }}>
            {t.text} {t.amount > 0 ? "+" : "-"}₹{Math.abs(t.amount)}
          </li>
        ))}
      </ul>

      <h3>Charts</h3>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {/* Pie Chart */}
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Bar Chart */}
        <BarChart width={250} height={200} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#2196F3" />
        </BarChart>
      </div>
    </div>
  );
}

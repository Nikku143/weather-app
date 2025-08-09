import React, { useState, useEffect } from "react";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", company: "", location: "" });

  // Simulate API fetch
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=5") // using dummy API as example
      .then((res) => res.json())
      .then((data) => {
        // Convert products to jobs format for demo
        const fakeJobs = data.products.map((p, i) => ({
          id: i + 1,
          title: p.title,
          company: "Company " + (i + 1),
          location: ["Remote", "New York", "London"][i % 3],
        }));
        setJobs(fakeJobs);
      });
  }, []);

  // Handle input changes for form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new job
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.company || !form.location)
      return alert("Fill all fields");
    setJobs([{ id: jobs.length + 1, ...form }, ...jobs]);
    setForm({ title: "", company: "", location: "" });
  };

  // Filter jobs
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Job Board</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      {/* Add Job Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add Job
        </button>
      </form>

      {/* Job List */}
      <ul style={styles.list}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <li key={job.id} style={styles.card}>
              <h3>{job.title}</h3>
              <p>
                <b>Company:</b> {job.company}
              </p>
              <p>
                <b>Location:</b> {job.location}
              </p>
            </li>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial",
  },
  heading: { textAlign: "center", color: "#333" },
  input: {
    padding: "8px",
    margin: "5px",
    width: "calc(100% - 20px)",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  form: { display: "flex", flexDirection: "column", marginBottom: "20px" },
  button: {
    padding: "10px",
    background: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  list: { listStyle: "none", padding: 0 },
  card: {
    background: "#f9f9f9",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "6px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
};

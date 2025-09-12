import React, { useEffect, useMemo, useState } from "react";

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("relevance");

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Fetch from Fake Store API
  function fetchProducts() {
    setLoading(true);
    setError(null);

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          price: item.price,
          rating: item.rating?.rate || 0,
          category: item.category,
          image: item.image,
          createdAt: Date.now() - Math.floor(Math.random() * 1000000000),
        }));
        setProducts(mapped);
        setLoading(false);

        const prices = mapped.map((p) => p.price);
        setMinPrice(Math.floor(Math.min(...prices)));
        setMaxPrice(Math.ceil(Math.max(...prices)));
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const s = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(s)];
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.slice();

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (minPrice <= maxPrice) {
      list = list.filter(
        (p) => p.price >= Number(minPrice) && p.price <= Number(maxPrice)
      );
    }

    if (minRating > 0) {
      list = list.filter((p) => p.rating >= minRating);
    }

    if (sortBy === "price_asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "newest")
      list.sort((a, b) => b.createdAt - a.createdAt);

    return list;
  }, [
    products,
    search,
    selectedCategory,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  const pageSlice = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Cart actions
  function addToCart(prod) {
    setCart((c) => {
      const next = { ...c };
      if (next[prod.id]) next[prod.id].qty += 1;
      else next[prod.id] = { product: prod, qty: 1 };
      localStorage.setItem("cart_v1", JSON.stringify(next));
      return next;
    });
  }

  function removeFromCart(prodId) {
    setCart((c) => {
      const next = { ...c };
      delete next[prodId];
      localStorage.setItem("cart_v1", JSON.stringify(next));
      return next;
    });
  }

  function updateQty(prodId, qty) {
    setCart((c) => {
      const next = { ...c };
      if (!next[prodId]) return c;
      next[prodId].qty = Math.max(1, qty);
      localStorage.setItem("cart_v1", JSON.stringify(next));
      return next;
    });
  }

  const cartCount = Object.values(cart).reduce((s, it) => s + it.qty, 0);
  const cartTotal = Object.values(cart).reduce(
    (s, it) => s + it.qty * it.product.price,
    0
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "24px" }}>
      {/* Header */}
      <header
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
          Product Listing
        </h1>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "280px",
            }}
          />
          <button
            style={{
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              background: "white",
            }}
            onClick={() =>
              document
                .getElementById("cart-drawer")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Cart ({cartCount})
          </button>
        </div>
      </header>

      {/* Main content */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          gap: "24px",
        }}
      >
        {/* Sidebar Filters */}
        <aside
          style={{
            background: "white",
            padding: "16px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          <h3 style={{ fontWeight: "600", marginBottom: "12px" }}>Filters</h3>
          <label>Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ width: "100%", padding: "8px", margin: "8px 0" }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <label>Price range</label>
          <div style={{ display: "flex", gap: "8px", margin: "8px 0" }}>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              style={{ flex: 1, padding: "8px" }}
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ flex: 1, padding: "8px" }}
            />
          </div>

          <label>Minimum rating</label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            style={{ width: "100%", padding: "8px", margin: "8px 0" }}
          >
            <option value={0}>Any</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
          </select>

          <label>Sort</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ width: "100%", padding: "8px", margin: "8px 0" }}
          >
            <option value="relevance">Relevance</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top rated</option>
            <option value="newest">Newest</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
              setMinRating(0);
              setSortBy("relevance");
              setPage(1);

              if (products.length) {
                const prices = products.map((p) => p.price);
                setMinPrice(Math.floor(Math.min(...prices)));
                setMaxPrice(Math.ceil(Math.max(...prices)));
              }
            }}
            style={{
              marginTop: "12px",
              padding: "8px 12px",
              background: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Reset Filters
          </button>
        </aside>

        {/* Products */}
        <section>
          {loading ? (
            <div style={{ padding: "16px", background: "white" }}>
              Loading products...
            </div>
          ) : error ? (
            <div style={{ padding: "16px", background: "white", color: "red" }}>
              {error}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
              }}
            >
              {pageSlice.map((p) => (
                <article
                  key={p.id}
                  style={{
                    background: "white",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ padding: "12px" }}>
                    <h4 style={{ fontWeight: "600" }}>{p.title}</h4>
                    <p style={{ fontSize: "14px", color: "#555" }}>
                      {p.description}
                    </p>
                    <div
                      style={{
                        marginTop: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: "bold" }}>
                          ₹{p.price.toFixed(2)}
                        </div>
                        <div style={{ fontSize: "12px", color: "#666" }}>
                          {p.rating} ★
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(p)}
                        style={{
                          padding: "6px 12px",
                          background: "green",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <button
              onClick={() => setPage((s) => Math.max(1, s - 1))}
              disabled={page === 1}
              style={{ padding: "6px 12px", border: "1px solid #ccc" }}
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((s) => Math.min(totalPages, s + 1))}
              disabled={page === totalPages}
              style={{ padding: "6px 12px", border: "1px solid #ccc" }}
            >
              Next
            </button>
          </div>
        </section>
      </main>

      {/* Cart Drawer */}
      <aside
        id="cart-drawer"
        style={{
          maxWidth: "1200px",
          margin: "24px auto",
          background: "white",
          padding: "16px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ fontWeight: "600", marginBottom: "12px" }}>
          Cart ({cartCount})
        </h3>
        {cartCount === 0 ? (
          <div style={{ color: "#666" }}>Cart is empty.</div>
        ) : (
          <div>
            {Object.values(cart).map((it) => (
              <div
                key={it.product.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "12px",
                  gap: "12px",
                }}
              >
                <img
                  src={it.product.image}
                  alt=""
                  style={{ width: "60px", height: "40px", objectFit: "cover" }}
                />
                <div style={{ flex: 1 }}>
                  <div>{it.product.title}</div>
                  <div style={{ fontSize: "14px", color: "#666" }}>
                    ₹{it.product.price.toFixed(2)}
                  </div>
                </div>
                <input
                  type="number"
                  value={it.qty}
                  onChange={(e) =>
                    updateQty(it.product.id, Number(e.target.value))
                  }
                  style={{ width: "50px", padding: "4px" }}
                />
                <button
                  onClick={() => removeFromCart(it.product.id)}
                  style={{ padding: "4px 8px", border: "1px solid #ccc" }}
                >
                  Remove
                </button>
              </div>
            ))}
            <div style={{ marginTop: "12px", fontWeight: "bold" }}>
              Total: ₹{cartTotal.toFixed(2)}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

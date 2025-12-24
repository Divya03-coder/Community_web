import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import "./community.css";

const Community = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  // Fetch communities from API
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await fetch("http://192.168.29.86:5001/api/communities");
        const result = await res.json();

        const communities = result.communities || [];
        setData(communities);

        const apiCategories = [
          ...new Set(communities.map((item) => item.category)),
        ];
        setCategories(["All", ...apiCategories]);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  // Filter data based on search and category
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [data, search, activeCategory]);

  // Handle card click (uses subdomain)
  const handleCardClick = (subdomain) => {
    if (isAuthenticated) {
      navigate(`/community/${subdomain}`);
    } else {
      navigate("/signin", {
        state: { from: { pathname: `/community/${subdomain}` } },
      });
    }
  };

  return (
    <div className="card_section">
      <section className="search-section">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Filters */}
        <div className="filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${
                activeCategory === cat ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="cards">
          {loading ? (
            <p>Loading...</p>
          ) : filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="card"
                onClick={() => handleCardClick(item.subdomain)}
              >
                <div>
                  <span className="category">{item.category}</span>
                  <h3>{item.name}</h3>
                  <h6>{item.description}</h6>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No results found</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Community;

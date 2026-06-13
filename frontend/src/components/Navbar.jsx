import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h2 style={{ color: "white", margin: 0 }}>
        Inventory Management System
      </h2>

      <div style={{ marginLeft: "auto", display: "flex", gap: "20px" }}>
        <Link to="/">Products</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/orders">Orders</Link>
      </div>
    </div>
  );
}

export default Navbar;
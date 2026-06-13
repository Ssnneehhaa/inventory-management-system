import { useEffect, useState } from "react";
import axios from "axios";

function Products() {

  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    stock: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get(
        "https://inventory-management-system-8hwk.onrender.com/products/"
    );

    setProducts(response.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addProduct = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
          "https://inventory-management-system-8hwk.onrender.com/products/",
        {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        }
      );

      fetchProducts();

      setFormData({
        name: "",
        sku: "",
        price: "",
        stock: ""
      });

    } catch (error) {

      alert(
        error.response?.data?.detail ||
        "Failed to add product"
      );

    }
  };

  return (
    <div className="page">

      <h1>📦 Products Dashboard</h1>

      <div className="stats">
        <div className="stat-card">
          <h2>{products.length}</h2>
          <p>Total Products</p>
        </div>
      </div>

      <div className="card">

        <h2>Add Product</h2>

        <form onSubmit={addProduct}>

          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            name="sku"
            placeholder="SKU"
            value={formData.sku}
            onChange={handleChange}
          />

          <input
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />

          <input
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
          />

          <button type="submit">
            Add Product
          </button>

        </form>

      </div>

      <h2 style={{ marginTop: "30px" }}>
        Product Inventory
      </h2>

      {products.map((product) => (

        <div
          key={product.id}
          className="card"
        >

          <h3>{product.name}</h3>

          <p>
            <strong>SKU:</strong> {product.sku}
          </p>

          <p>
            <strong>Price:</strong> ₹{product.price}
          </p>

          <p>
            <strong>Stock:</strong> {product.stock}
          </p>

        </div>

      ))}

    </div>
  );
}

export default Products;
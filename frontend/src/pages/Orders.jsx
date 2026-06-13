import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    customer_id: "",
    product_id: "",
    quantity: ""
  });

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    const response = await axios.get(
      "https://inventory-management-system-8hwk.onrender.com/orders/"
    );

    setOrders(response.data);
  };

  const fetchCustomers = async () => {
    const response = await axios.get(
      "https://inventory-management-system-8hwk.onrender.com/orders/"
    );

    setCustomers(response.data);
  };

  const fetchProducts = async () => {
    const response = await axios.get(
      "https://inventory-management-system-8hwk.onrender.com/products/"
    );

    setProducts(response.data);
  };

  const createOrder = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://inventory-management-system-8hwk.onrender.com/orders/",
        {
          customer_id: Number(formData.customer_id),
          product_id: Number(formData.product_id),
          quantity: Number(formData.quantity)
        }
      );

      fetchOrders();
      fetchProducts();

      setFormData({
        customer_id: "",
        product_id: "",
        quantity: ""
      });

    } catch (error) {

      alert(
        error.response?.data?.detail ||
        "Order creation failed"
      );

    }
  };

  return (
    <div className="page">

      <h1>🛒 Order Management</h1>

      <div className="stats">

        <div className="stat-card">
          <h2>{orders.length}</h2>
          <p>Total Orders</p>
        </div>

        <div className="stat-card">
          <h2>{customers.length}</h2>
          <p>Customers</p>
        </div>

        <div className="stat-card">
          <h2>{products.length}</h2>
          <p>Products</p>
        </div>

      </div>

      <div className="card">

        <h2>Create Order</h2>

        <form onSubmit={createOrder}>

          <select
            value={formData.customer_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                customer_id: e.target.value
              })
            }
          >
            <option value="">
              Select Customer
            </option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.name}
              </option>
            ))}
          </select>

          <select
            value={formData.product_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                product_id: e.target.value
              })
            }
          >
            <option value="">
              Select Product
            </option>

            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.name} (Stock: {product.stock})
              </option>
            ))}
          </select>

          <input
            placeholder="Quantity"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                quantity: e.target.value
              })
            }
          />

          <button type="submit">
            Create Order
          </button>

        </form>

      </div>

      <h2 style={{ marginTop: "30px" }}>
        Order History
      </h2>

      {orders.map((order) => (

        <div
          key={order.id}
          className="card"
        >

          <h3>Order #{order.id}</h3>

          <p>
            <strong>Customer ID:</strong> {order.customer_id}
          </p>

          <p>
            <strong>Product ID:</strong> {order.product_id}
          </p>

          <p>
            <strong>Quantity:</strong> {order.quantity}
          </p>

        </div>

      ))}

    </div>
  );
}

export default Orders;
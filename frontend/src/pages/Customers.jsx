import { useEffect, useState } from "react";
import axios from "axios";

function Customers() {

  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {

    const response = await axios.get(
      "http://127.0.0.1:8000/customers/"
    );

    setCustomers(response.data);

  };

  const addCustomer = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://127.0.0.1:8000/customers/",
        formData
      );

      fetchCustomers();

      setFormData({
        name: "",
        email: ""
      });

    } catch (error) {

      alert(
        error.response?.data?.detail ||
        "Failed to add customer"
      );

    }

  };

  return (
    <div className="page">

      <h1>👥 Customer Management</h1>

      <div className="stats">

        <div className="stat-card">
          <h2>{customers.length}</h2>
          <p>Total Customers</p>
        </div>

      </div>

      <div className="card">

        <h2>Add Customer</h2>

        <form onSubmit={addCustomer}>

          <input
            placeholder="Customer Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
            }
          />

          <input
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
          />

          <button type="submit">
            Add Customer
          </button>

        </form>

      </div>

      <h2 style={{ marginTop: "30px" }}>
        Customer Directory
      </h2>

      {customers.map((customer) => (

        <div
          key={customer.id}
          className="card"
        >

          <h3>{customer.name}</h3>

          <p>
            <strong>Email:</strong> {customer.email}
          </p>

        </div>

      ))}

    </div>
  );
}

export default Customers;
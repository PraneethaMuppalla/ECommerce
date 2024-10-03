import { useState } from "react";
import axios from "axios";
import "./CreateProduct.css";

const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic Validation
    if (!productName || !category || !quantity || !imageUrl || !price) {
      setError("All fields are required!");
      return;
    }

    if (isNaN(quantity) || quantity <= 0) {
      setError("Please enter a valid quantity!");
      return;
    }

    if (isNaN(price) || price <= 0) {
      setError("Please enter a valid price!");
      return;
    }

    // Firebase API Call to create product using Axios

    const body = {
      productName,
      category,
      quantity,
      imageUrl,
      price,
    };
    try {
      const response = await axios.post(
        "https://e-commerce-490bd-default-rtdb.firebaseio.com/products.json",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Product created successfully!");
        setProductName("");
        setCategory("");
        setQuantity("");
        setImageUrl("");
      } else {
        alert("Error creating product");
      }
    } catch (error) {
      alert("Some error occured. Please try again.");
      console.error("API error:", error);
    }
  };

  return (
    <div className="product-form-container">
      <form className="product-create-form" onSubmit={handleSubmit}>
        <h2>Create Product</h2>

        {error && <div className="product-error-message">{error}</div>}

        <div className="product-form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="product-form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Choose Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Apparel">Apparel</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
          </select>
        </div>

        <div className="product-form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            required
          />
        </div>
        <div className="product-form-group">
          <label htmlFor="quantity">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="product-form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            required
          />
        </div>

        <button type="submit" className="product-submit-button">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;

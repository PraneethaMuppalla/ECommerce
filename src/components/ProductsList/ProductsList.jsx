import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./ProductsList.css";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://e-commerce-490bd-default-rtdb.firebaseio.com/products.json"
      );

      const arr = [];
      for (const id in res.data) {
        arr.push({ id, ...res.data[id] });
      }
      setProducts(arr);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products.");
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://e-commerce-490bd-default-rtdb.firebaseio.com/products/${id}.json`
      );
      alert("Product deleted successfully!");
      fetchProducts(); // Refresh the product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setNewQuantity(product.quantity);
  };

  const handleUpdateQuantity = async () => {
    if (isNaN(newQuantity) || newQuantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    try {
      await axios.patch(
        `https://e-commerce-490bd-default-rtdb.firebaseio.com/products/${selectedProduct.id}.json`,
        {
          quantity: newQuantity,
        }
      );
      alert("Product updated successfully!");
      setSelectedProduct(null); // Close the modal
      fetchProducts(); // Refresh the product list after update
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="product-list-container">
      <h2>Products List</h2>

      {error && <div className="error-message">{error}</div>}

      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="product-image"
                />
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => openEditModal(product)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Product Quantity</h3>
            <div className="modal-body">
              <label>Product: {selectedProduct.productName}</label>
              <input
                type="number"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                min="1"
                className="modal-input"
              />
            </div>
            <div className="modal-footer">
              <button className="save-button" onClick={handleUpdateQuantity}>
                Save
              </button>
              <button
                className="close-button"
                onClick={() => setSelectedProduct(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsList;

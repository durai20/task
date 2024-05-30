import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [company, setCompany] = useState('');
  const [categories, setCategories] = useState('');
  const [numberOfProducts, setNumberOfProducts] = useState('');
  const [price, setPrice] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'company':
        setCompany(value);
        break;
      case 'categories':
        setCategories(value);
        break;
      case 'numberOfProducts':
        setNumberOfProducts(value);
        break;
      case 'price':
        setPrice(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setData(null); // Clear previous data

    try {
      const queryString = `company=<span class="math-inline">\{company\}&categories\=</span>{categories}`; // Build query string
      const response = await axios.get(
        `http://20.244.56.144/test/companies/<span class="math-inline">\{company\}/categories/</span>{categories}/products?${queryString}`
      );
      setData(response.data);
    } catch (err) {
      setError('Error fetching data. Please try again.');
    }
  };

  // Optional: Fetch data on component mount if needed
  useEffect(() => {
    // Implement logic to fetch data on initial render if required
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3 mt-5">
          <label for="company" className="col-sm-2 col-form-label">
            Company
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="company"
              name="company"
              value={company}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label for="categories" className="col-sm-2 col-form-label">
            Categories
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="categories"
              name="categories"
              value={categories}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label for="numberOfProducts" className="col-sm-2 col-form-label">
            No. Of Products
          </label>
          <div className="col-sm-10">
            <input
              type="number" // Use number type for numeric input
              className="form-control"
              id="numberOfProducts"
              name="numberOfProducts"
              value={numberOfProducts}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label for="price" className="col-sm-2 col-form-label">
            Price
          </label>
          <div className="col-sm-10">
            <input
              type="number" // Use number type for numeric input
              className="form-control"
              id="price"
              name="price"
              value={price}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" style={{ marginLeft: '50%' }}>
          Submit
        </button>
      </form>

      {data && (
        <table>
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
              <th>Column 4</th>
              <th>Column 5</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over data to render table rows */}
            {data.map((item, index) => (
              <tr key={index}>
                 {/* Access and display data from each item here */}
                 <td>{item.property1}</td>
                <td>{item.property2}</td>
                <td>{item.property3}</td>
                <td>{item.property4}</td>
                <td>{item.property5}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default App;

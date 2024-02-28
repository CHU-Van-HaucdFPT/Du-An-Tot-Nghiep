import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShoppingItem from './ShoppingItem';
import '../../App.css';
import axios from 'axios';
import { getAllProduct } from './product';
import { useDispatch,useSelector } from 'react-redux';

const ListProduct = () => {
    const [selectedPrice, setSelectedPrice] = useState(null);
    const prices = ['All', '$10 - $20', '$20 - $30', '$30 - $40'];
    const handlePriceChange = (price) => {
      setSelectedPrice(price);
      console.log(getAllProduct())
    };
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://du-an-tot-nghiep-be-1.vercel.app/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);
  const productsData = Array.isArray(products) ? products : [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12 mb-4">
          <label>Filter by Price: </label>
          <select
            onChange={(e) => handlePriceChange(e.target.value)}
            value={selectedPrice || 'All'}
          >
            {prices.map((price, index) => (
              <option key={index} value={price}>
                {price}
              </option>
            ))}
          </select>
        </div>
        {productsData
          .filter((product) => {
            if (selectedPrice === null || selectedPrice === 'All') {
              return true;
            } else {
              const [min, max] = selectedPrice
                .replace('$', '')
                .split(' - ')
                .map((price) => parseFloat(price));
              return product.price >= min && product.price <= max;
            }
          })
          .map((product) => (
            
            <div key={product.id} className="col-md-3">
              <ShoppingItem
                productName={product.name}
                title={product.date}
                price={product.price}
                image={product.thumbnail}
                description={product.description}
                id={product._id}
              />
             
            </div>
                    
          ))}
      </div>
    </div>
  );
}


export default ListProduct;

import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ShoppingItem = ({ productName, title, price, image, description, id }) => {
  return (

    <div className="card">
      <img src={image} className="card-img-top" alt={productName} />
      <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <span className='card-sao' >★★★★★</span>
        <span className="card-text" >{price}VNĐ</span>

        <a href="/cart" className="btn btn-primary">Add to Cart</a>
        <Button variant="primary" className="btn-details">
          <Link to={`/products/${id}`}
            style={{ color: "white", textDecoration: 'none' }}
          >
            Xem chi tiết
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ShoppingItem;

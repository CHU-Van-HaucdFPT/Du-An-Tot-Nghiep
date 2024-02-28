import React, { useState,useEffect } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { SketchPicker } from "react-color";
import { Carousel } from "antd";
import "./ProductDetailStyle.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { IoLaptopSharp } from "react-icons/io5";
import { BiSolidErrorCircle } from "react-icons/bi";
import { BsRocketTakeoffFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import axios from "axios";
import { useParams } from 'react-router-dom';
import CommentSection from "./Comment";
import { Link } from "react-router-dom";
const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState(null);
  const [productDetailbt, setProductDetailbt] = useState(null);
  const path = window.location.pathname;
  const pathParts = path.split('/');
  const productId = pathParts[pathParts.length - 1];
  const [loading, setLoading] = useState(true);
  
  // useEffect((productId) => {
  //  CommentSection();
  // });
  useEffect(() => {
    const ProductDetail = async () => {
      try {
        const response = await axios.get(`https://du-an-tot-nghiep-be-1.vercel.app/products/${productId}`);
        const productData = response.data;
      console.log(productData);
        // const productbt = productData[0].optionsDetails[0];
        // localStorage.setItem('productbt', productbt);
        const productDatabt = productData[0].optionsDetails;
        setProductDetailbt(productDatabt)
        setProductDetail(productData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch product detail:', error);
        setLoading(false); 
      }
    };
    ProductDetail();
  }, []); 
  const [currentSlide, setCurrentSlide] = useState(0);

  const onChange = (current) => {
    setCurrentSlide(current);
  };

  const handleThumbnailClick = (index) => {
    setCurrentSlide(index);
  };
  const [selectedColor, setSelectedColor] = useState("#ff0000");

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };
  console.log(productDetailbt);
  return (
     <div>
      <Header />
      <div className="containerDetail">
        <div className="left-section">
          <section>
            <Carousel afterChange={onChange} initialSlide={currentSlide}>
              {productDetail?.map((product, index) => (
                <div key={index}>
                  <img
                    src={product.thumbnail}
                    alt={`Image ${index + 1}`}
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </div>
              ))}
            </Carousel>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              {productDetail?.map((product, index) => (
                <div
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                >
                  <img
                    src={product.thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    style={{
                      width: "90px",
                      height: "55px",
                      borderRadius: "10px",
                      border:
                        currentSlide === index
                          ? "2px solid #1890ff"
                          : "2px solid #ccc",
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
          <p style={{ marginTop: "8px", fontSize: "13px", marginLeft: "55px", marginBottom: "20px" }}>
            MacOne là đại lý bán lẻ ủy quyền các nhà phân phối chính hãng Apple
            Việt Nam
          </p>
          <section
            style={{
              border: "1px solid gray",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              marginBottom: "20px"
            }}
          >
            <p style={{ fontSize: "13px" }}>
              Sản phẩm chính hãng Apple mới 100% nguyên seal. Phụ kiện chính
              hãng gồm: hộp trùng imei, sạc, cable, sách hướng dẫn
            </p>
          </section>
          {/*  */}
          <section>
            <h6 style={{ fontWeight: "bold", marginBottom: "20px" }}>Phụ kiện liên quan</h6>
            <section
              class="containerPK"
              style={{ display: "flex", gap: "150px" }}
            >
              <div class="item">
                <img
                  width={"250px"}
                  src="https://cdn.tgdd.vn/Files/2023/08/02/1540742/1-020823-124636.jpg"
                  alt="Product 1"
                />
                <h6>Apple Magic Mouse 2 – White Multi-Touch Surface – NEW</h6>
                <p style={{ fontWeight: "bold", color: "red" }}>999.000d</p>
              </div>
              <div class="item">
                <img
                  width={"250px"}
                  src="https://cdn.tgdd.vn/Files/2023/08/02/1540742/1-020823-124636.jpg"
                  alt="Product 2"
                />
                <h6>Apple Magic Mouse 2 – White Multi-Touch Surface – NEW</h6>
                <p style={{ fontWeight: "bold", color: "red" }}>999.000d</p>
              </div>
            </section>
          </section>
        </div>
        <div className="right-section">
          <section style={{ textAlign: "left" }}>
            {productDetail?.map((product, index) => (
              <div key={index}>
                <h3 style={{ fontWeight: "bold", width: "100%" }}>
                  {product.name}
                </h3>
              </div>
            ))}
            
          <div   className="price" style={{ marginTop: "20px" }}>
              {productDetail?.map((product, index) => (
                <div key={index}>
                  <h5 style={{ color: "red", fontWeight: "bold" }}>{product.price}VNĐ</h5>
                </div>
              ))}
             
              <h7>
                Trả góp từ{" "}
                <span style={{ color: "green", fontWeight: "bold" }}>
                  2.650.000đ/tháng
                </span>
              </h7>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h7
                style={{
                  fontWeight: "bold",
                  marginRight: "10px",
                  marginTop: "10px",
                }}
              >
                Màu sắc:
              </h7>
              <div>
                <input
                  type="radio"
                  id="red"
                  name="color"
                  value="#ff0000"
                  checked={selectedColor === "#ff0000"}
                  onChange={handleColorChange}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="red"
                  style={{
                    backgroundColor: "#ff0000",
                    width: "20px",
                    height: "20px",
                    display: "inline-block",
                    marginRight: "5px",
                    border:
                      selectedColor === "#ff0000" ? "2px solid #000" : "none",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                />

                <input
                  type="radio"
                  id="green"
                  name="color"
                  value="#00ff00"
                  checked={selectedColor === "#00ff00"}
                  onChange={handleColorChange}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="green"
                  style={{
                    backgroundColor: "#00ff00",
                    width: "20px",
                    height: "20px",
                    display: "inline-block",
                    marginRight: "5px",
                    border:
                      selectedColor === "#00ff00" ? "2px solid #000" : "none",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                />

                <input
                  type="radio"
                  id="blue"
                  name="color"
                  value="#0000ff"
                  checked={selectedColor === "#0000ff"}
                  onChange={handleColorChange}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="blue"
                  style={{
                    backgroundColor: "#0000ff",
                    width: "20px",
                    height: "20px",
                    display: "inline-block",
                    border:
                      selectedColor === "#0000ff" ? "2px solid #000" : "none",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                />
              </div>
              {/* banner */}
            </div>
            <img
              style={{ width: "100%", borderRadius: "10px", marginTop: "20px" }}
              src="https://macone.vn/wp-content/uploads/2024/01/Anh-con-tung-sanpham-ChoiDamBoc-01-1.jpg"
            />
            {/* Chinh sach */}
          </section>
          {/*  */}
          <section style={{ textAlign: "left", marginTop: "10px", display: "flex", alignItems: "center" }}>
            <AiFillCheckCircle style={{ color: "green", marginRight: "5px" }} />
            <span>Sản phẩm chính hãng</span>
          </section>
          <section style={{ textAlign: "left", marginTop: "10px", display: "flex", alignItems: "center" }}>
            <AiFillCheckCircle style={{ color: "green", marginRight: "5px" }} />
            <span>Giá đã bao gồm VAT</span>
          </section>
          <section style={{ textAlign: "left", marginTop: "10px", display: "flex", alignItems: "center" }}>
            <AiFillCheckCircle style={{ color: "green", marginRight: "5px" }} />
            <span>Bảo hành 12 tháng</span>
          </section>
          <section style={{ textAlign: "left", marginTop: "10px", display: "flex", alignItems: "center" }}>
            <AiFillCheckCircle style={{ color: "green", marginRight: "5px" }} />
            <span>Giảm giá 10% khi mua phụ kiện kèm theo</span>
          </section>
          {/*  */}
          <section style={{ marginTop: "20px" }}>
            <div className="purchase-section">
              <button className="buy-now-button">Mua Ngay</button> 
              <div className="additional-buttons">
                <button className="additional-button">Thêm vào giỏ hàng</button>
                <button className="additional-button">Mua trả góp</button>
              </div>
            </div>
          </section>
          {/*  */}
          <section style={{ textAlign: "left", marginTop: "7px", display: "flex", alignItems: "center" }}>
            <IoLaptopSharp style={{ marginRight: "5px" }} />
            <span>Dùng thử 10 ngày miễn phí đổi máy. (Macbook Like New)</span>
          </section>
          <section style={{ textAlign: "left", marginTop: "7px", display: "flex", alignItems: "center" }}>
            <BiSolidErrorCircle style={{ marginRight: "5px" }} />
            <span>Lỗi 1 Đổi 1 trong 30 ngày đầu. (Macbook Like New)</span>
          </section>
          <section style={{ textAlign: "left", marginTop: "7px", display: "flex", alignItems: "center" }}>
            <BsRocketTakeoffFill style={{ marginRight: "5px" }} />
            <span>Giao hàng tận nhà toàn quốc</span>
          </section>
          <section style={{ textAlign: "left", marginTop: "7px", display: "flex", alignItems: "center" }}>
            <AiFillLike style={{ marginRight: "5px" }} />
            <span>Thanh toán khi nhận hàng (nội thành)</span>
          </section>
          <section style={{ textAlign: "left", marginTop: "7px", display: "flex", alignItems: "center" }}>
            <BsFillTelephoneInboundFill style={{ marginRight: "5px" }} />
            <span>Gọi 0936 096 900 để được tư vấn mua hàng (Miễn phí)</span>
          </section>

          {/*  */}
          <section
            style={{
              border: "1px solid gray",
              padding: "10px",
              borderRadius: "10px",
              margin: "20px 0",
            }}
          >
            <h6
              style={{
                color: "#404040",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Thông số kỹ thuật
            </h6>
            <div
              style={{
                paddingBottom: "10px",
                color: "#404040",
                fontSize: "14px",
                marginBottom: "8px",
                background: "#ccc",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                height: "30px",
              }}
              className="technical"
            >
              <p
                style={{
                  fontSize: "13px",
                  marginRight: "60px",
                  marginLeft: "10px",
                  color: "#808080",
                  marginTop: "5px",
                }}
              >
                Bộ xử lý CPU
              </p>
              <p
                style={{ fontSize: "13px", color: "#808080", marginTop: "5px" }}
              >
                Apple M2 chip with 8‑core CPU, 10‑core GPU, 16‑core Neural
                Engine
              </p>
            </div>
            <div
              style={{
                paddingBottom: "10px",
                color: "#404040",
                fontSize: "14px",
                marginBottom: "8px",
                background: "white",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                height: "30px",
              }}
              className="technical"
            >
              <p
                style={{
                  fontSize: "13px",
                  marginRight: "60px",
                  marginLeft: "10px",
                  color: "#808080",
                  marginTop: "5px",
                }}
              >
                Bộ nhớ RAM
              </p>
              <p
                style={{ fontSize: "13px", color: "#808080", marginTop: "5px" }}
              >
                8GB
              </p>
            </div>
            <div
              style={{
                paddingBottom: "10px",
                color: "#404040",
                fontSize: "14px",
                marginBottom: "8px",
                background: "#ccc",
                height: "30px",
              }}
              className="technical"
            >
              <p
                style={{
                  fontSize: "13px",
                  marginRight: "60px",
                  marginLeft: "10px",
                  color: "#808080",
                  marginTop: "5px",
                }}
              >
                Màn hình
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "#808080",
                  marginTop: "5px",
                  marginLeft: "17px",
                }}
              >
                13-inch Retina display with True Tone
              </p>
            </div>
            <div
              style={{
                paddingBottom: "10px",
                color: "#404040",
                fontSize: "14px",
                marginBottom: "8px",
                background: "white",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                height: "30px",
              }}
              className="technical"
            >
              <p
                style={{
                  fontSize: "13px",
                  marginRight: "60px",
                  marginLeft: "10px",
                  color: "#808080",
                  marginTop: "5px",
                }}
              >
                Card màn hình
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "#808080",
                  marginTop: "5px",
                  marginLeft: "-13px",
                }}
              >
                10‑core GPU
              </p>
            </div>
            <div
              style={{
                paddingBottom: "10px",
                color: "#404040",
                fontSize: "14px",
                marginBottom: "8px",
                background: "#ccc",
                height: "30px",
              }}
              className="technical"
            >
              <p
                style={{
                  fontSize: "13px",
                  marginRight: "60px",
                  marginLeft: "10px",
                  color: "#808080",
                  marginTop: "5px",
                }}
              >
                Ổ cứng
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "#808080",
                  marginTop: "5px",
                  marginLeft: "31px",
                }}
              >
                256GB SSD
              </p>
            </div>
            <div
              style={{
                paddingBottom: "10px",
                color: "#404040",
                fontSize: "14px",
                marginBottom: "8px",
                background: "white",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                height: "30px",
              }}
              className="technical"
            >
              <p
                style={{
                  fontSize: "13px",
                  marginRight: "60px",
                  marginLeft: "10px",
                  color: "#808080",
                  marginTop: "5px",
                }}
              >
                Kích thước
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "#808080",
                  marginTop: "5px",
                  marginLeft: "13px",
                }}
              >
                3.0 pounds (1.4 kg)
              </p>
            </div>
            <div
              style={{
                paddingBottom: "10px",
                color: "#404040",
                fontSize: "14px",
                marginBottom: "8px",
                background: "#ccc",
                height: "30px",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
              className="technical"
            >
              <p
                style={{
                  fontSize: "13px",
                  marginRight: "60px",
                  marginLeft: "10px",
                  color: "#808080",
                  marginTop: "5px",
                }}
              >
                Camera
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "#808080",
                  marginTop: "5px",
                  marginLeft: "28px",
                }}
              >
                {" "}
                720p FaceTime HD camera
              </p>
            </div>
          </section>
        </div>
       
        </div>
      < div > <CommentSection productId={productId} /></div>
      <Footer />
    </div>

    
   
     
  )
};

export default ProductDetail;


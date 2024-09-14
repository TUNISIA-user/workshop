import { useState, useEffect } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import "./sass/main.scss";

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data));
  }, []);

  console.log(products);

  const searchProduct = products.filter((product) => {
    return Object.keys(product).some((key) =>
      product[key]
        .toString()
        .toLowerCase()
        .includes(search.toString().toLowerCase())
    );
  });

  const Truncate = (string, number) => {
    if (!string) {
      return null;
    }
    if (string.length <= number) {
      return string;
    }
    return string.slice(0, number) + "...";
  };

  return (
    <>
      <section className="product">
        <div className="container">
          <input
            className="product-input"
            placeholder="Product Filter"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="grid">
            {searchProduct.map((product) => (
              <div className="card" key={product.id}>
                <img
                  className="card-image"
                  src={product.image}
                  alt={product.title}
                />
                <div className="card-body">
                  <h5
                    className="card-title"
                    title={product.title.length >= 50 ? product.title : null}
                  >
                    {Truncate(product.title, 55)}
                  </h5>
                  <p className="card-description">
                    {Truncate(product.description, 55)}
                  </p>
                  <p className="card-price">${product.price}</p>
                  <div className="card-detail">
                    <StarRatings
                      rating={product.rating.rate}
                      starDimension="16px"
                      starSpacing="1px"
                      starRatedColor="black"
                    />
                    <span>Stock:{product.rating.count} </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default App;

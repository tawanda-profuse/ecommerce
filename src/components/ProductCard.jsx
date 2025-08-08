import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductCard = ({ product, addProduct }) => {
  const isAvailable = product.rating.count > 0;

  // Helper to show stars from rating.rate (out of 5)
  const renderStars = (rate) => {
  const fullStars = Math.floor(rate);
  const halfStar = rate - fullStars >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={`full-${i}`} className="fas fa-star text-warning"></i>);
  }
  if (halfStar) {
    stars.push(<i key="half" className="fas fa-star-half-alt text-warning"></i>);
  }
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<i key={`empty-${i}`} className="far fa-star text-warning"></i>);
  }
  return stars;
};


  return (
    <div id={product.id} className="col-md-4 col-sm-6 col-12 mb-4">
      <div className="card h-100 shadow-sm border-0 rounded-3 text-center">
        {/* Image */}
        <img
          className="card-img-top p-3 img-fluid"
          src={product.image}
          alt={product.title}
          style={{
            height: "280px",
            objectFit: "contain",
          }}
        />

        {/* Body */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-semibold">
            {product.title.length > 18
              ? product.title.substring(0, 18) + "..."
              : product.title}
          </h5>

          {/* Category */}
          <p className="text-muted fst-italic small mb-2 text-capitalize">
            {product.category}
          </p>

          {/* Description */}
          <p className="card-text text-muted small flex-grow-1">
            {product.description.substring(0, 80)}...
          </p>

          {/* Price */}
          <h6 className="fw-bold text-primary mb-2">$ {product.price}</h6>

          {/* Rating */}
          <div className="mb-3">
            <div>{renderStars(product.rating.rate)}</div>
            <small className="text-muted">
              {product.rating.rate} / 5 ({product.rating.count} reviews)
            </small>
          </div>

          {/* Variant Select */}
          <select
            className="form-select form-select-sm mb-3"
            defaultValue=""
          >
            <option value="" disabled>
              -- Select Options --
            </option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
            <option>Option 4</option>
          </select>

          {/* Action Buttons */}
          <div className="mt-auto">
            <Link
              to={`/product/${product.id}`}
              className="btn btn-outline-dark w-100 mb-2"
            >
              View Details
            </Link>

            {isAvailable ? (
              <button
                className="btn btn-dark w-100"
                onClick={() => {
                  toast.success("Added to cart");
                  addProduct(product);
                }}
              >
                Add to Cart
              </button>
            ) : (
              <button className="btn btn-secondary w-100" disabled>
                Out of Stock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

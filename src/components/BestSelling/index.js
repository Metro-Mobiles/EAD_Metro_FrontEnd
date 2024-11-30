import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ItemCard from "../../components/ItemCard/index";
import { Link } from "react-router-dom";
import UserService from "../../services/UserService";

const BestSelling = () => {
  // const products = [
  //   {
  //     id: 1,
  //     name: "HAVIT HV-G92 Gamepad",
  //     unitPrice: 20000,
  //     initialRating: 5,
  //     reviews: 88,
  //     discount: 40,
  //     image: "/images/Product4.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "JBL AA Speakers",
  //     unitPrice: 3000,
  //     initialRating: 4,
  //     reviews: 75,
  //     discount: 35,
  //     image: "../../images/Product4.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Samsung Gear S3",
  //     unitPrice: 16000,
  //     initialRating: 5,
  //     reviews: 99,
  //     discount: 30,
  //     image: "../../images/Product4.jpg",
  //   },
  //   {
  //     id: 4,
  //     name: "JBL T450 AA",
  //     unitPrice: 1600,
  //     initialRating: 5,
  //     reviews: 99,
  //     discount: 25,
  //     image: "../../images/Product4.jpg",
  //   },
  //   {
  //     id: 5,
  //     name: "Sony PS5 Controller",
  //     unitPrice: 8000,
  //     initialRating: 5,
  //     reviews: 120,
  //     discount: 20,
  //     image: "../../images/Product4.jpg",
  //   },
  //   {
  //     id: 6,
  //     name: "Apple Watch Series 6",
  //     unitPrice: 50000,
  //     initialRating: 5,
  //     reviews: 200,
  //     discount: 15,
  //     image: "../../images/Product4.jpg",
  //   },
  // ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth <= 768 ? 1 : 4); // Show 1 item per page on mobile, 4 on desktop
    };

    handleResize(); // Set on initial render
    window.addEventListener("resize", handleResize); // Update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // const handleRatingChange = (productId, newRating) => {
  //   console.log(`Product ${productId} new rating:`, newRating);
  // };

  const getAllProduct = async () => {
    const response = await UserService.getAllProduct();
    if (response.success) {
      setProducts(response.data);
    } else {
      console.error("Failed to fetch products:", response.error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-3 mt-5 border-b-2 border-gray-200">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 mt-4">
          <div className="w-4 h-10 rounded-sm bg-gradient-to-b from-black to-orange-500" />
          <span className="text-orange-500 font-black">This Month</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h2 className="text-2xl font-bold pb-3">Best Selling Products</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto px-4 max-w-screen-xl place-items-center">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Link key={product.id} to={`/productdetails/${product.id}`}>
              <ItemCard
                key={product.id}
                id={product.id}
                name={product.name}
                unitPrice={product.unitPrice}
                initialRating={product.initialRating}
                reviews={product.reviews}
                discount={product.discount}
                image={product.image}
                skuCode={product.skuCode}
                // onRatingChange={(newRating) =>
                //   handleRatingChange(product.id, newRating)
                // }
              />
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-lg text-gray-600">
            No products available.
          </div>
        )}
      </div>

      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`p-2 rounded-full ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-full ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex justify-center mt-8">
        <button className="px-6 py-2 my-2 bg-[#FFAD33] text-white rounded hover:bg-orange-600">
          <Link to="/bestselling">View All Products</Link>{" "}
        </button>
      </div>
    </div>
  );
};

export default BestSelling;

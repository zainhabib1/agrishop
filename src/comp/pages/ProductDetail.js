import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { FaVolumeUp } from 'react-icons/fa';

const placeholderImage = '/path/to/placeholder.jpg';

function ProductDetail({ setCartItems }) {
    const { productId } = useParams();
    const navigate = useNavigate();
     const [product, setProduct] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    const [imgSrc, setImgSrc] = useState({});
    const speechRef = useRef(null);
     const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
             setLoading(true);
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}/`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
               const data = await response.json();
               setProduct(data);
               setImgSrc({[data.id]: data.image});
            }
            catch(err){
                setError(err.message || 'An error occurred while fetching product.');
            }
            finally {
                setLoading(false);
            }

        };
        fetchProduct();
    }, [productId]);


    const handleImageError = (id) => {
        setImgSrc((prevState) => ({
            ...prevState,
            [id]: placeholderImage,
        }));
    };


      if (loading) {
          return <div className="text-center py-8">Loading product details...</div>;
       }

       if (error) {
           return <div className="text-center py-8 text-red-500">Error: {error}</div>;
       }

    if (!product) {
        return <div className="text-center py-10">Product not found.</div>;
    }

    const handleAddToCart = () => {
      setCartItems(prevCart => {
           const isProductInCart = prevCart.some(item => item.id === product.id);
             if (isProductInCart) {
                alert(`${product.title} is already in the cart`);
                return prevCart;
              }
             alert(`${product.title} added to cart`);
            return [...prevCart, { ...product, uniqueCode: `P${product.id}` }];
         });
    };

     const handleShopNow = () => {
        setCartItems(prevCart => {
            const isProductInCart = prevCart.some(item => item.id === product.id);
            if (isProductInCart) {
                alert(`${product.title} is already in the cart`);
                return prevCart;
             }
             alert(`${product.title} added to cart`);
          return [...prevCart, { ...product, uniqueCode: `P${product.id}` }];
       });
       navigate('/cart');
    };


    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSpeak = () => {
          if (isSpeaking) {
              window.speechSynthesis.cancel();
              setIsSpeaking(false);
              return;
          }
         const utterance = new SpeechSynthesisUtterance(product.description);
          utterance.onstart = () => {
              setIsSpeaking(true);
         }
         utterance.onend = () => {
              setIsSpeaking(false);
          }
          window.speechSynthesis.speak(utterance);
          speechRef.current = utterance;
    };


     return (
         <div className="max-w-4xl mx-auto px-4 py-8">
             <button onClick={handleGoBack} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg mb-6 hover:bg-gray-300 transition duration-200">
                  Go Back
             </button>
             <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                 <div className="md:w-1/2 p-4 flex items-center justify-center bg-gray-100">
                     <img
                       src={imgSrc[product.id] || product.image}
                       alt={product.title}
                       className="object-contain w-full h-auto max-h-96"
                       onError={() => handleImageError(product.id)}
                       />
                 </div>
                 <div className="md:w-1/2 p-4">
                     <h2 className="text-3xl font-semibold mb-4 text-gray-900">{product.title}</h2>
                     <p className="text-gray-700 mb-2">Price: Rs. {product.price}</p>
                     <p className="text-gray-700 mb-6">{product.description}</p>
                     <div className="flex justify-between items-center mb-6">
                         <button
                              onClick={handleSpeak}
                             className={`bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center ${isSpeaking ? 'bg-red-500 hover:bg-red-600' : ''}`}
                          >
                              <FaVolumeUp className="mr-2" /> {isSpeaking ? 'Stop' : 'Listen'}
                           </button>
                         <div className="relative group">
                             <span className="text-green-500 cursor-pointer">
                                  <CiHeart className="w-8 h-8" />
                            </span>
                           <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-16 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  Add to Wishlist
                           </span>
                         </div>
                     </div>
                     <div className="flex space-x-4">
                          <button
                             onClick={handleAddToCart}
                              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
                             Add to Cart
                         </button>
                        <button
                            onClick={handleShopNow}
                             className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200">
                           Shop Now
                        </button>
                     </div>
                 </div>
            </div>
        </div>
      );
}

export default ProductDetail;
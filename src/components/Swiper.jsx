// import React, { useState } from 'react';
// import { products } from '../data/products';

// const Swiper = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [wishlist, setWishlist] = useState([]);
//   const [showWishlist, setShowWishlist] = useState(false);
//   const [showDetails, setShowDetails] = useState(false);
//   const [touchStart, setTouchStart] = useState(null);
//   const [touchEnd, setTouchEnd] = useState(null);

//   // Filter out products that are already in wishlist
//   const filteredProducts = products.filter(
//     (product) => !wishlist.some((item) => item.id === product.id)
//   );
  
//   const currentProduct = filteredProducts[currentIndex];

//   // Handle manual button swipe
//   const handleSwipe = (direction) => {
//     if (!currentProduct) return;
    
//     if (direction === 'right') {
//       if (!wishlist.find(item => item.id === currentProduct.id)) {
//         setWishlist([...wishlist, currentProduct]);
//       }
//     } else if (direction === 'up') {
//       setShowDetails(true);
//       return;
//     }
    
//     setCurrentIndex(prev => (prev + 1) % filteredProducts.length);
//   };

//   // Handle touch swipe gestures
//   const minSwipeDistance = 50;

//   const onTouchStart = (e) => {
//     setTouchEnd(null);
//     setTouchStart({
//       x: e.targetTouches[0].clientX,
//       y: e.targetTouches[0].clientY
//     });
//   };

//   const onTouchMove = (e) => {
//     setTouchEnd({
//       x: e.targetTouches[0].clientX,
//       y: e.targetTouches[0].clientY
//     });
//   };

//   const onTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;
    
//     const distanceX = touchStart.x - touchEnd.x;
//     const distanceY = touchStart.y - touchEnd.y;
//     const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
    
//     if (isHorizontalSwipe) {
//       // Horizontal swipe
//       if (Math.abs(distanceX) > minSwipeDistance) {
//         if (distanceX > 0) {
//           // Swipe left (reject)
//           handleSwipe('left');
//         } else {
//           // Swipe right (add to wishlist)
//           handleSwipe('right');
//         }
//       }
//     } else {
//       // Vertical swipe
//       if (distanceY > minSwipeDistance) {
//         // Swipe up (show details)
//         handleSwipe('up');
//       }
//     }
//   };

//   const toggleWishlist = () => {
//     setShowWishlist(!showWishlist);
//     setShowDetails(false);
//   };

//   const goBackToSwiper = () => {
//     setShowDetails(false);
//   };

//   // Image component with strict fixed dimensions
//   const FixedImage = ({ src, alt, size }) => {
//     const styles = {
//       width: size === 'small' ? '80px' : size === 'medium' ? '200px' : '300px',
//       height: size === 'small' ? '80px' : size === 'medium' ? '200px' : '300px',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#f9f9f9',
//       borderRadius: '8px',
//       overflow: 'hidden',
//       margin: '0 auto'
//     };
    
//     const imgStyles = {
//       maxWidth: '90%',
//       maxHeight: '90%',
//       objectFit: 'contain'
//     };
    
//     return (
//       <div style={styles}>
//         <img src={src} alt={alt} style={imgStyles} />
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       {/* Wishlist icon with count */}
//       <div className="w-full flex justify-end mb-4">
//         <button
//           className="relative bg-white p-3 rounded-full shadow-md hover:shadow-lg transition"
//           onClick={toggleWishlist}
//         >
//           <span className="material-icons">favorite</span>
//           {wishlist.length > 0 && (
//             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//               {wishlist.length}
//             </span>
//           )}
//         </button>
//       </div>

//       {/* Wishlist Page */}
//       {showWishlist ? (
//         <div className="w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
//           {wishlist.length === 0 ? (
//             <p className="text-gray-500">No items in wishlist.</p>
//           ) : (
//             <div className="grid gap-4">
//               {wishlist.map((product) => (
//                 <div
//                   key={product.id}
//                   className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
//                 >
//                   {/* Using fixed size image component */}
//                   <FixedImage 
//                     src={product.imageUrl}
//                     alt={product.name}
//                     size="small"
//                   />
//                   <div className="flex-1">
//                     <h3 className="font-semibold">{product.name}</h3>
//                     <p className="text-sm text-gray-600">{product.brand}</p>
//                     <p className="text-sm font-semibold text-pink-600">
//                       ₹{product.price}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//           <button 
//             onClick={toggleWishlist}
//             className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Back to Products
//           </button>
//         </div>
//       ) : showDetails && currentProduct ? (
//         // Product Details Page
//         <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
//           <button 
//             onClick={goBackToSwiper} 
//             className="mb-4 text-blue-500 flex items-center"
//           >
//             <span className="material-icons mr-1">arrow_back</span> Back
//           </button>
          
//           {/* Using fixed size image component */}
//           <div className="mb-6">
//             <FixedImage 
//               src={currentProduct.imageUrl}
//               alt={currentProduct.name}
//               size="large"
//             />
//           </div>
          
//           <h2 className="text-2xl font-bold mb-2">{currentProduct.name}</h2>
//           <p className="text-gray-600 mb-2">{currentProduct.brand}</p>
//           <div className="flex items-center mb-4">
//             <p className="text-pink-600 font-semibold text-xl">
//               ₹{currentProduct.price}
//             </p>
//             <span className="line-through text-gray-400 ml-2">
//               ₹{currentProduct.originalPrice}
//             </span>
//             <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
//               {currentProduct.discountPercentage}% OFF
//             </span>
//           </div>
          
//           <div className="border-t border-gray-200 pt-4">
//             <h3 className="font-bold mb-2">Product Details</h3>
//             <p className="text-gray-700">
//               {currentProduct.description || "No detailed description available for this product."}
//             </p>
//           </div>
          
//           <div className="mt-6 flex space-x-3">
//             <button 
//               onClick={() => handleSwipe('right')}
//               className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg flex items-center justify-center"
//             >
//               <span className="material-icons mr-1">favorite</span> Add to Wishlist
//             </button>
//             <button 
//               className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center"
//             >
//               <span className="material-icons mr-1">shopping_cart</span> Buy Now
//             </button>
//           </div>
//         </div>
//       ) : (
//         // Swipe view
//         currentProduct && (
          
//           <div 
//             className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg flex flex-col items-center"
//             onTouchStart={onTouchStart}
//             onTouchMove={onTouchMove}
//             onTouchEnd={onTouchEnd}
//           >
//             {/* Using fixed size image component */}
//             <div className="mb-6">
//               <FixedImage 
//                 src={currentProduct.imageUrl}
//                 alt={currentProduct.name}
//                 size="medium"
//               />
//             </div>
            
//             <h2 className="text-xl font-bold">{currentProduct.name}</h2>
//             <p className="text-gray-600">{currentProduct.brand}</p>
//             <p className="text-pink-600 font-semibold text-lg mt-1">
//               ₹{currentProduct.price}{' '}
//               <span className="line-through text-gray-400 ml-2">
//                 ₹{currentProduct.originalPrice}
//               </span>
//             </p>
//             <p className="text-green-500 text-sm">
//               {currentProduct.discountPercentage}% OFF
//             </p>
            
//             <div className="mt-6 text-center text-gray-500 text-sm">
//               <p>Swipe ← to skip | Swipe → to add to wishlist | Swipe ↑ for details</p>
//             </div>
            
//             <div className="flex space-x-6 mt-4">
//               <button
//                 onClick={() => handleSwipe('left')}
//                 className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl shadow"
//               >
//                 Skip
//               </button>
//               <button
//                 onClick={() => handleSwipe('up')}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow"
//               >
//                 Details
//               </button>
//               <button
//                 onClick={() => handleSwipe('right')}
//                 className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl shadow"
//               >
//                 Like
//               </button>
//             </div>
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default Swiper;


import React, { useState } from 'react';
import { products } from '../data/products';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Badge,
  Stack
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Swiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const filteredProducts = products.filter(
    (product) => !wishlist.some((item) => item.id === product.id)
  );
  const currentProduct = filteredProducts[currentIndex];

  const handleSwipe = (direction) => {
    if (!currentProduct) return;

    if (direction === 'right') {
      if (!wishlist.find((item) => item.id === currentProduct.id)) {
        setWishlist([...wishlist, currentProduct]);
      }
    } else if (direction === 'up') {
      setShowDetails(true);
      return;
    }

    setCurrentIndex((prev) => (prev + 1) % filteredProducts.length);
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchMove = (e) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe) {
      if (Math.abs(distanceX) > minSwipeDistance) {
        if (distanceX > 0) {
          handleSwipe('left');
        } else {
          handleSwipe('right');
        }
      }
    } else {
      if (distanceY > minSwipeDistance) {
        handleSwipe('up');
      }
    }
  };

  const toggleWishlist = () => {
    setShowWishlist(!showWishlist);
    setShowDetails(false);
  };

  const FixedImage = ({ src, alt, size }) => {
    const dimensions = {
      small: 80,
      medium: 200,
      large: 300
    };

    return (
      <Box
        sx={{
          width: dimensions[size],
          height: dimensions[size],
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f9f9f9',
          borderRadius: 2,
          overflow: 'hidden',
          mx: 'auto'
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
        />
      </Box>
    );
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Box width="100%" display="flex" justifyContent="flex-end" mb={2}>
        <IconButton color="error" onClick={toggleWishlist}>
          <Badge badgeContent={wishlist.length} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
      </Box>

      {showWishlist ? (
        <Card sx={{ p: 3, maxWidth: 400, width: '100%' }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Your Wishlist
          </Typography>
          {wishlist.length === 0 ? (
            <Typography color="text.secondary">No items in wishlist.</Typography>
          ) : (
            <Stack spacing={2}>
              {wishlist.map((product) => (
                <Card key={product.id} sx={{ display: 'flex', p: 2 }}>
                  <FixedImage src={product.imageUrl} alt={product.name} size="small" />
                  <Box ml={2}>
                    <Typography fontWeight="bold">{product.name}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      {product.brand}
                    </Typography>
                    <Typography color="error" variant="body2">
                      ₹{product.price}
                    </Typography>
                  </Box>
                </Card>
              ))}
            </Stack>
          )}
          <Button onClick={toggleWishlist} variant="contained" sx={{ mt: 3 }} fullWidth>
            Back to Products
          </Button>
        </Card>
      ) : showDetails && currentProduct ? (
        <Card sx={{ p: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => setShowDetails(false)}
            sx={{ mb: 2 }}
          >
            Back
          </Button>

          <FixedImage src={currentProduct.imageUrl} alt={currentProduct.name} size="large" />

          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {currentProduct.name}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {currentProduct.brand}
            </Typography>

            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="h6" color="error">
                ₹{currentProduct.price}
              </Typography>
              <Typography
                variant="body2"
                color="text.disabled"
                sx={{ textDecoration: 'line-through', ml: 1 }}
              >
                ₹{currentProduct.originalPrice}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  ml: 2,
                  backgroundColor: '#e6f4ea',
                  color: '#137333',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1
                }}
              >
                {currentProduct.discountPercentage}% OFF
              </Typography>
            </Box>

            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Product Details
            </Typography>
            <Typography color="text.secondary">
              {currentProduct.description || 'No detailed description available.'}
            </Typography>

            <Stack direction="row" spacing={2} mt={4}>
              <Button
                variant="contained"
                color="success"
                startIcon={<FavoriteIcon />}
                onClick={() => handleSwipe('right')}
              >
                Add to Wishlist
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
              >
                Buy Now
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ) : (
        currentProduct && (
          <Card
            sx={{ p: 3, maxWidth: 400 }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <FixedImage src={currentProduct.imageUrl} alt={currentProduct.name} size="medium" />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {currentProduct.name}
              </Typography>
              <Typography color="text.secondary">{currentProduct.brand}</Typography>
              <Typography color="error" fontWeight="bold" mt={1}>
                ₹{currentProduct.price}
                <Typography
                  component="span"
                  variant="body2"
                  color="text.disabled"
                  sx={{ ml: 1, textDecoration: 'line-through' }}
                >
                  ₹{currentProduct.originalPrice}
                </Typography>
              </Typography>
              <Typography color="success.main" variant="body2">
                {currentProduct.discountPercentage}% OFF
              </Typography>

              <Typography mt={2} variant="caption" display="block" textAlign="center" color="text.secondary">
                Swipe ← to skip | → to wishlist | ↑ for details
              </Typography>

              <Stack direction="row" spacing={2} mt={3} justifyContent="center">
                <Button variant="contained" color="error" onClick={() => handleSwipe('left')}>
                  Skip
                </Button>
                <Button variant="contained" color="primary" onClick={() => handleSwipe('up')}>
                  Details
                </Button>
                <Button variant="contained" color="success" onClick={() => handleSwipe('right')}>
                  Like
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )
      )}
    </Box>
  );
};

export default Swiper;


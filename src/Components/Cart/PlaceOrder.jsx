import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../Redux/Slices/CartSlice';

const loadScript = src => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = src;
  script.onload = () => {
    console.log('razorpay loaded successfully');
    resolve(true);
  };
  script.onerror = () => {
    console.log('error in loading razorpay');
    resolve(false);
  };
  document.body.appendChild(script);
});

export const PlaceOrder = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL
  const { cart } = useSelector(state => state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [paymentDetails, setPaymentDetails] = useState({
    CustomerName: "",
    CustomerEmail: "",
    HomeAddress: "",
    CustomerCity: "",
    CustomerPhone: ""

  })
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setPaymentDetails({ ...paymentDetails, [name]: value })

  }
  const totalPrice = cart?.result?.reduce((total, item) => total + item.offerPrice * item.quantity, 0)
  console.log(totalPrice);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!displayRazorpay) {
      const scriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      setDisplayRazorpay(scriptLoaded);
      if (!scriptLoaded) {
        toast.error("Failed to load payment gateway. Please try again later.");
        return;
      }
    }

    try {
      const res = await axios.post(`${baseUrl}/orders/razor?price=${totalPrice}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const orderId = res.data;

      const options = {
        amount: totalPrice * 100,
        currency: "INR",
        name: "FurniHub",
        description: "Order Payment",
        order_id: orderId,
        handler: async (response) => {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          };
          setOrderDetails(paymentData);
          try {
            await axios.post(`${baseUrl}/orders/payment`, paymentData, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            });
            await axios.post(baseUrl + "/orders", {
              ...paymentDetails,
              TotalAmount: totalPrice,
              OrderString: response.razorpay_order_id,
              TransactionId: response.razorpay_payment_id
            }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            });
            toast.success("Order placed successfully!");
            dispatch(fetchCart())

            navigate("/");
          } catch (error) {
            console.error("Payment verification failed", error);
            toast.error("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: paymentDetails.CustomerName,
          email: paymentDetails.CustomerEmail,
          contact: paymentDetails.CustomerPhone
        },
        theme: {
          color: "#3399cc"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error creating order", error);
      toast.error("Error creating order. Please try again.");
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="bg-white p-8 shadow-md rounded-lg">
            <h2 className="text-3xl font-semibold mb-6 text-center">Shipping Address</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="CustomerName" className="block text-gray-700 font-medium mb-2">
                  CustomerName
                </label>
                <input
                  type="text"
                  id="CustomerName"
                  name="CustomerName"
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="CustomerEmail" className="block text-gray-700 font-medium mb-2">
                  CustomerEmail
                </label>
                <input
                  type="text"
                  id="CustomerEmail"
                  name="CustomerEmail"
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="CustomerPhone" className="block text-gray-700 font-medium mb-2">
                  CustomerPhone
                </label>
                <input
                  type="number"
                  id="CustomerPhone"
                  name="CustomerPhone"
                  placeholder="CustomerPhone no"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="HomeAddress" className="block text-gray-700 font-medium mb-2">
                  HomeAddress
                </label>
                <input
                  type="text"
                  id="HomeAddress"
                  name="HomeAddress"
                  placeholder="Your address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="CustomerCity" className="block text-gray-700 font-medium mb-2">
                  CustomerCity
                </label>
                <input
                  type="text"
                  id="CustomerCity"
                  name="CustomerCity"
                  placeholder="CustomerCity"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                  required
                  onChange={handleChange}
                />
              </div>


              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-900 transition duration-300"
              >
                Continue to Payment
              </button>
            </form>
          </div>


          {/* Order Summary */}
<div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Summary</h2>

  {/* Order Items */}
  <ul className="space-y-4 mb-4">
    {cart?.result?.map((item, index) => (
      <li key={index} className="flex items-center space-x-4">
        <img
          src={item.image}
          alt={item.productName}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
          <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
        </div>
      </li>
    ))}
  </ul>

  {/* Pricing Section */}
  <div className="border-t pt-4 text-gray-700">
   
  </div>

  {/* Total Section */}
  <div className="flex justify-between text-xl font-bold mt-4 text-gray-800">
    <span>Total</span>
    <span>₹{totalPrice}</span>
  </div>

</div>

    </div>
    </div>
    </div>
  );
};

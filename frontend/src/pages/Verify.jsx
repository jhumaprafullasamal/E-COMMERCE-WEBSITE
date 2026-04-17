import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId ,userId: backendUrl.getItem("userId")  },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        
      } else {
        navigate("/cart");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center animate-fade-in">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100 animate-bounce">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful
        </h1>

        <p className="text-gray-500 mb-6">
          Thank you for your order. Your payment has been verified successfully.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/collection")}
            className="px-6 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition duration-300"
          >
            Continue Shopping
          </button>

        </div>

      </div>
    </div>
  );
};

export default Verify;
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PayButton = ({ cartItems, shippingPrice, shippingTitle }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const handleCheckout = () => {
    if (process.env.NODE_ENV === "development") {
      toast.info("Please Wait While We Load Stripe Checkout For You!");
      axios
        .post("http://localhost:3000/api/stripe/create-checkout-session", {
          cartItems,
          userId: userInfo._id,
          email: userInfo.email,
          shippingPrice,
          shippingTitle,
        })
        .then((response) => {
          if (response.data.url) {
            window.location.href = response.data.url;
          }
        })
        .catch((err) => {
          console.log(err.message);
          toast.error(err.message);
        });
    }

    if (process.env.NODE_ENV === "production") {
      toast.info("Please Wait While We Load Stripe Checkout For You!");
      axios
        .post("https://creativeduo.net/api/stripe/create-checkout-session", {
          cartItems,
          userId: userInfo._id,
          email: userInfo.email,
          shippingPrice,
          shippingTitle,
        })
        .then((response) => {
          if (response.data.url) {
            window.location.href = response.data.url;
          }
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <>
      <button
        onClick={() => handleCheckout()}
        className="btn bg-black w-full text-white hover:bg-gray-700"
      >
        Check out
      </button>
    </>
  );
};

export default PayButton;

import BannerBis from "../components/BannerBis";
import Infos from "../components/Infos";

import shopBanner from "/public/shop_banner.webp";
import Form from "../components/Form";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";

function Checkout() {
  const { panier, setPanier, setQuantity } = useContext(Context);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (panier.length === 0) {
      return;
    }
    setPanier([]);
    setQuantity(0);
    navigate("/");
  };

  return (
    <div className="checkout">
      <BannerBis title="Checkout" shopBanner={shopBanner} />
      <div className="checkout-container flex flex-row justify-center items-start w-full p-5">
        <Form />
        <div className="checkout-summary flex flex-column w-1/2 gap-4">
          <table className="flex flex-col w-full h-full">
            <thead>
              <tr className="table-header flex flex-row w-full h-full justify-between items-center">
                <th className="text-lg font-bold">Product</th>
                <th className="text-lg font-bold">Price</th>
              </tr>
            </thead>
            <tbody>
              {panier.map((item) => (
                <tr className="flex flex-row w-full h-full justify-between items-center">
                  <td className="text-lg font-bold my-1">{item.title} x {item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
              <tr className="flex flex-row w-full h-full justify-between items-center">
                <td>Total</td>
                <td className="text-2xl font-bold text-amber-900 my-3">
                  {panier.reduce((acc, item) => acc + item.price, 0)}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="flex flex-row justify-center items-center">
                <hr className="flex flex-row justify-center items-center w-75 h-0.25 bg-stone-200 border-none my-3" />
              </tr>
              <tr className="flex flex-col w-full h-full justify-center items-start">
                <td className="flex flex-col w-1/2 h-full">
                  <div>
                    <input type="radio" name="method" value="cash" id="cash" className="my-3 mx-2"/>
                    <label for="cash">Cash</label>
                  </div>
                  <p className="text-sm text-stone-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                    porro possimus.
                  </p>
                </td>
                <td>
                  <input type="radio" name="method" value="card" id="card" className="my-3 mx-2" />
                  <label for="card">Credit / Debit Card</label>
                </td>
                <td>
                  <input
                    type="radio"
                    name="method"
                    value="paypal"
                    id="paypal" className="my-3 mx-2"
                  />
                  <label for="paypal">PayPal</label>
                </td>
              </tr>
              <tr>
                <p className="text-sm text-stone-500">
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our privacy policy.
                </p>
              </tr>
              <tr className="flex flex-row justify-center items-center">
                <button
                  className="cursor-pointer"
                  onClick={handlePlaceOrder}
                  className="border-2 border-zinc-900 rounded-xl px-10 py-2 m-5 cursor-pointer"
                >
                  Place Order
                </button>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <Infos />
    </div>
  );
}

export default Checkout;

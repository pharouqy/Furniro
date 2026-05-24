import BannerBis from "../components/BannerBis";
import Infos from "../components/Infos";

import shopBanner from "/public/shop_banner.webp";

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
        <div className="flex flex-col w-1/2 gap-4">
          <h2>Billings Details</h2>
          <form className="flex flex-col gap-4 h-full">
            <div className="flex flex-row gap-4 w-full">
              <div>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" required />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" required />
              </div>
            </div>
            <div>
              <label htmlFor="company">Company Name (Optional)</label>
              <input type="text" id="company" name="company" />
            </div>
            <div>
              <label htmlFor="country">Country / Region</label>
              <select name="country" id="country" required>
                <option value="">Select a country / region</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
              </select>
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" required />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" required />
            </div>
            <div>
              <label htmlFor="state">State / Province</label>
              <input type="text" id="state" name="state" required />
            </div>
            <div>
              <label htmlFor="zip">Zip / Postal Code</label>
              <input type="text" id="zip" name="zip" required />
            </div>
            <div>
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <textarea
                id="message"
                name="message"
                placeholder="Aditional informations"
                required
              ></textarea>
            </div>
          </form>
        </div>
        <div className="checkout-summary flex flex-column w-1/2 gap-4">
          <table className="flex flex-col w-full h-full">
            <thead>
              <tr className="table-header flex flex-row w-full h-full justify-between items-center">
                <th>Product</th>
                <th>SubTotal</th>
              </tr>
            </thead>
            <tbody>
              {panier.map((item) => (
                <tr className="flex flex-row w-full h-full justify-between items-center">
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
              <tr className="flex flex-row w-full h-full justify-between items-center">
                <td>Total</td>
                <td>{panier.reduce((total, item) => total + item.price, 0)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="flex flex-row justify-center items-center">
                <hr className="flex flex-row justify-center items-center w-75 h-0.5 bg-stone-200 border-none" />
              </tr>
              <tr className="flex flex-col w-full h-full justify-center items-start">
                <td className="flex flex-col w-1/2 h-full">
                  <div>
                    <input type="radio" name="method" value="cash" id="cash" />
                    <label for="cash">Cash</label>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                    porro possimus.
                  </p>
                </td>
                <td>
                  <input type="radio" name="method" value="card" id="card" />
                  <label for="card">Credit / Debit Card</label>
                </td>
                <td>
                  <input
                    type="radio"
                    name="method"
                    value="paypal"
                    id="paypal"
                  />
                  <label for="paypal">PayPal</label>
                </td>
              </tr>
              <tr>
                <p>
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our privacy policy.
                </p>
              </tr>
              <tr>
                <button className="cursor-pointer" onClick={handlePlaceOrder}>
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

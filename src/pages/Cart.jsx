import BannerBis from "../components/BannerBis";
import Infos from "../components/Infos";

import shopBanner from "/public/shop_banner.webp";

import { useContext } from "react";
import Context from "../hooks/Context";

function Cart() {
  const { setPanier, panier } = useContext(Context);

  return (
    <div className="cart">
      <BannerBis title={"Cart"} shopBanner={shopBanner} />
      <div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>SubTotal</td>
              </tr>
              <tr>
                {panier.map((item) => (
                  <td>
                    <img
                      src={item.picture}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <p>{item.title}</p>
                    <p>{item.price}</p>
                    <p>{item.quantity}</p>
                    <p>{item.price * item.quantity}</p>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2>Cart Total</h2>
          <div>
            <p>SubTotal</p>{" "}
            <span>
              {panier
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>
          <div>
            <p>Total</p>{" "}
            <span>
              {panier
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>
          <button>Check Out</button>
        </div>
      </div>
      <Infos />
    </div>
  );
}

export default Cart;

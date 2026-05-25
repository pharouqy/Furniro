import BannerBis from "../components/BannerBis";
import Infos from "../components/Infos";

import shopBanner from "/public/shop_banner.webp";

import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  const { setPanier, panier, setQuantity } = useContext(Context);

  useEffect(() => {
    setQuantity(panier.reduce((total, item) => total + item.quantity, 0));
  }, [panier, setQuantity]);

  return (
    <div className="cart ">
      <BannerBis title={"Cart"} shopBanner={shopBanner} />
      <div className="flex flex-row justify-center items-start gap-4 w-full h-full">
        <div className="flex flex-col w-75 h-full">
          <table className="cart-table flex flex-col gap-4">
            <thead className="bg-amber-100">
              <tr className="p-4 flex flex-row justify-between gap-4">
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>SubTotal</td>
                <td></td>
              </tr>
            </thead>
            <tbody className="flex flex-col gap-4">
              {panier.map((item) => (
                <tr className="flex flex-row justify-between">
                  <td className="flex flex-col gap-2 items-center">
                    <img
                      src={item.picture}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <p>{item.title}</p>
                    <div>
                      <span>{item.color}</span> | <span>{item.size}</span>
                    </div>
                  </td>
                  <td className="flex flex-row gap-2 items-center">
                    {item.price}
                  </td>
                  <td className="flex flex-row gap-2 items-center">
                    <input
                      className="w-10 h-10 p-2 rounded"
                      type="number"
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        setPanier(
                          panier.map((i) =>
                            i.productId === item.productId
                              ? { ...i, quantity: Number(e.target.value) }
                              : i,
                          ),
                        )
                      }
                      value={item.quantity}
                      min="0"
                    />
                  </td>
                  <td className="flex flex-row gap-2 items-center">
                    {item.price * item.quantity}
                  </td>
                  <td className="flex flex-row gap-2 items-center">
                    <button
                      onClick={() =>
                        setPanier(panier.filter((i) => i !== item))
                      }
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col place-items-stretch w-25 h-full bg-amber-100 p-4 gap-4">
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
          <Link to="/checkout">
            <button className="w-full h-5 border-2 bg-amber-100 rounded hover:bg-amber-200 transition-colors cursor-pointer">
              Checkout
            </button>
          </Link>
        </div>
      </div>
      <Infos />
    </div>
  );
}

export default Cart;

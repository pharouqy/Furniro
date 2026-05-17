import { Link } from "react-router-dom";
import { useContext } from "react";
import Context from "../hooks/Context";

function OffCart({ panier, isOpen, setIsOpen }) {
  const { setPanier, setQuantity, quantity } = useContext(Context);

  const subtotal = panier.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <>
      {isOpen && (
        <div className="relative w-full h-full">
          <div
            className="overlay fixed top-0 left-0 bg-black/50 w-full h-full z-50"
            onClick={() => setIsOpen(!isOpen)}
          ></div>

          <div className="off-canvas-wrap w-70 h-50 bg-white fixed top-0 right-0 z-50 p-6 flex flex-col gap-6 overflow-y-auto">
            <div className="flex justify-between">
              <h2>Shopping Cart</h2>

              <span
                className="close-button cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                X
              </span>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {panier.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  panier.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}-${item.color}`}
                      className="flex gap-3 items-center"
                    >
                      <span
                        className="text-gray-500 cursor-pointer"
                        onClick={() => {
                          setPanier(
                            panier.filter(
                              (i) =>
                                !(
                                  i.productId === item.productId &&
                                  i.size === item.size &&
                                  i.color === item.color
                                ),
                            ),
                          );
                          setQuantity(quantity - item.quantity);
                        }}
                      >
                        X
                      </span>

                      <img
                        src={item.picture}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <div>
                        <p className="font-bold">{item.title}</p>

                        <p>
                          {item.quantity} x {item.price.toLocaleString()} Da
                        </p>

                        {(item.size || item.color) && (
                          <p className="text-sm text-gray-500">
                            {item.size && `Size: ${item.size}`}
                            {item.size && item.color && " | "}
                            {item.color && `Color: ${item.color}`}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex justify-between font-bold">
                <span>SubTotal</span>
                <span>{subtotal.toLocaleString()} Da</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Link to="/cart" onClick={() => setIsOpen(false)}>
              <button className="border px-4 rounded-4xl hover:bg-gray-100">
                Cart
              </button>
              </Link>
              <button className="border px-4 rounded-4xl hover:bg-gray-100">
                Checkout
              </button>
              <button className="border px-4 rounded-4xl hover:bg-gray-100">
                Comparaison
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OffCart;

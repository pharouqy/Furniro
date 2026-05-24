import { createContext } from "react";

const Context = createContext({
  quantity: 0,
  setQuantity: () => {},
  panier: [],
  setPanier: () => {},
});

export default Context;

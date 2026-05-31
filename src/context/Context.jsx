import { createContext } from "react";

const Context = createContext({
  quantity: 0,
  setQuantity: () => {},
  panier: [],
  setPanier: () => {},
  countOfLikes: 0,
  setCountOfLikes: () => {},
});

export default Context;

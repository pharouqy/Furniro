import { createContext } from "react";

const Context = createContext({
  quantity: 0,
  setQuantity: () => {},
});

export default Context;

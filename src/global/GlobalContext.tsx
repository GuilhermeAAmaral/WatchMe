import React from "react";
import { MoviesContextData } from "./GlobalState";

const GlobalContext = React.createContext<MoviesContextData>({} as MoviesContextData)

export default GlobalContext
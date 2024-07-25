import { configureStore } from "@reduxjs/toolkit";
import Redux from "./slice/Redux";
export const store=configureStore({
    reducer:{
REDUX:Redux,
    }
})
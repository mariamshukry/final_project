import React, { useContext } from "react";
import Products from "../Products/Products";
import Category from "../Category/Category";
import HomeSlider from "../slider/slider";


export default function Home() {

  return (
    <div>
  <HomeSlider/>
    <h2>Category</h2>
    <Category/>
    <h2>Products </h2>
    <Products/>
    </div>
  );
}

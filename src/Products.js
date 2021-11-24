import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";

export function Products(params) {
  const [products,setProducts]=useState([]);
  
  async function getdata() {
    const data=await fetch("https://6166c4e513aa1d00170a6713.mockapi.io/products");
    const prds=await data.json();
    setProducts(prds);
  }
   useEffect(getdata,[])
  return (
    <div className="all-products">
      {products.map(({name,image,id},index)=>(
        <ProductCard key={index} name={name} image={image} id={id} />
      ))}
    </div>
  );
}


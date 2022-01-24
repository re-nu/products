import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";

export function Products(params) {
  const [products,setProducts]=useState([]);
  
  async function getdata() {
    const data=await fetch("https://productsd.herokuapp.com/products");
    const prds=await data.json();
    setProducts(prds);
  }
   useEffect(getdata,[])
  return (
    <div className="all-products">
      {products.map(({name,image,_id},index)=>(
        <ProductCard key={index} name={name} image={image} id={_id} />
      ))}
    </div>
  );
}


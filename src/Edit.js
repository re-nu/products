import { useParams,useHistory } from "react-router";
import { useState,useEffect } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function Edit(params) {
  //get id valiable from url
  const {id}=useParams();
  //initialy product is empty object, after competing the fetch product will be updated to fetched object
  const [product,setProduct]=useState({});

  //called only onces , when Edit component is render  
  useEffect(()=>{
    async function getData() {
      const data= await fetch(`https://6166c4e513aa1d00170a6713.mockapi.io/products/${id}`); //get specific id data
      const prd=await data.json();              //convert JSON data into json array
      console.log(prd);                          
       setProduct(prd);                         //update product
      console.log("setproducts",product);
    }getData();
  },[]);
  return product?<Update product={product} id={id}/>:" ";    //call update component when product has some data
}

function Update({product,id}) {
  const history=useHistory();
   console.log(product,id);
  const [name,setname]=useState(product.name);
  const [image,setimage]=useState(product.image);
  const [calories,setcalories]=useState(product.calories);
  const [cabs,setcabs]=useState(product.cabs);
  const [fat,setfat]=useState(product.fat);
  const [protein,setprotien]=useState(product.protein);

  //const updated={name,image,calories,cabs,fat,protein}
  // console.log("before update",updated)

   async function edit(){
    const updated={name,image,calories,cabs,fat,protein}
    console.log("after-update",updated);
    const data=await fetch(
      `https://6166c4e513aa1d00170a6713.mockapi.io/products/${id}`,
       {method:"PUT",
         body:JSON.stringify(updated),
         headers:{"Content-Type":"application/json",}
        }
      );
      history.push("/desserts")    //after editing change url to /desserts 
  }

  return(
    <div className="update">
  
      <TextField 
      value={name}
      onChange={(e)=>setname(e.target.value)}
      id="standard-basic" label="Name" variant="filled" />

        <TextField
          id="image"
          label="image"
          value={image}
          onChange={(e)=>{setimage(e.target.value)}}
          variant="filled"
        />
        <TextField
          id="calories"
          label="Calories"
          value={calories}
          onChange={(e)=>{setcalories(e.target.value)}}
          variant="filled"
        />
        <TextField
          id="fat"
          label="Fats"
          value={fat}
          onChange={(e)=>{setfat(e.target.value)}}
          variant="filled"
        />
        <TextField
          id="cabs"
          label="Cabs"
          value={cabs}
          onChange={(e)=>{setcabs(e.target.value)}}
          variant="filled"
        />
        <TextField
          id="protein"
          label="Protein"
          value={protein}
          onChange={(e)=>{setprotien(e.target.value)}}
          variant="filled"
        />
        <Button 
        onClick={edit}
        variant="outlined">update changes</Button>
    </div>
  );
  
}
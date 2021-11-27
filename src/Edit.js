import { useParams,useHistory } from "react-router";
import { useState,useEffect } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from "formik";
import * as yup from "yup";

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

function Update({product}) {
  const history=useHistory();
   console.log(product.id);
  // const [name,setname]=useState(product.name);
  // const [image,setimage]=useState(product.image);
  // const [calories,setcalories]=useState(product.calories);
  // const [cabs,setcabs]=useState(product.cabs);
  // const [fat,setfat]=useState(product.fat);
  // const [protein,setprotien]=useState(product.protein);

  //const updated={name,image,calories,cabs,fat,protein}
  // console.log("before update",updated)

   async function edit(values){
    console.log("after-update",values);
    // const data=await fetch(
    //   `https://6166c4e513aa1d00170a6713.mockapi.io/products/${id}`,
    //    {method:"PUT",
    //      body:JSON.stringify(values),
    //      headers:{"Content-Type":"application/json",}
    //     }
    //   );
    //   history.push("/desserts")    //after editing change url to /desserts 
  }

  const formvalid=yup.object({
    name:yup
    .string()
    .min(3,"atleast 2 charcter required 😊")
    .required(),
  
     image:yup.string().required(),
  
     calories:yup.number().required(),
     fat:yup.number().required(),
     cabs:yup.number().required(),
     protien:yup.number().required(),
  
  })

     //useFormik ,set initial values to null
     const {handleSubmit,values,handleChange,handleBlur,errors,touched}=useFormik({
      initialValues:{
        name:"",
        image:"",
        calories:"",
        fat:"",
        cabs:"",
        protien:"",
      },
      validationSchema:formvalid,
      // when there's no error only then onSubmit will be called
      onSubmit:(values)=>{
        console.log("onsubmit",values);
        // add new product data
        edit(values); 
      }
    });

  return(
    <form  onSubmit={handleSubmit}  className="add">
    {/* on submit,on change,on blur formik handles it */}
     <TextField
       id="name"
       name="name"
       value={values.name}
       onChange={handleChange}
       onBlur={handleBlur} 
       label="Name"
       variant="filled"
      //  display error only when validationSchema has no error and the field is touches
       helperText={errors.name&&touched.name&&errors.name}
      />
     <TextField 
        id="image"
        name="image"
        value={values.image}
        onChange={handleChange}
        onBlur={handleBlur} 
        label="Image" 
        variant="filled"
        helperText={errors.image&&touched.image&&errors.image}
     />
     <TextField 
        id="calories"
        name="calories"
        value={values.calories}
        onChange={handleChange}
        onBlur={handleBlur} 
        label="Calories" 
        variant="filled" 
        helperText={errors.calories&&touched.calories&&errors.calories}
      />
     <TextField 
        id="fat"
        name="fat"
        value={values.fat}
        onChange={handleChange}
        onBlur={handleBlur} 
       label="Fats" 
       variant="filled" 
       helperText={errors.fat&&touched.fat&&errors.fat}
      />
     <TextField 
        id="cabs"
        name="cabs"
        value={values.cabs}
        onChange={handleChange}
        onBlur={handleBlur} 
       label="Cabs" 
       variant="filled"
       helperText={errors.cabs&&touched.cabs&&errors.cabs} 
      />
     <TextField 
       id="protien"
       name="protien"
       value={values.protien}
       onChange={handleChange}
       onBlur={handleBlur}  
       label="Protien" 
       variant="filled" 
       helperText={errors.protien&&touched.protien&&errors.protien}
     />
     <Button  type="submit"  variant="outlined">Add Dessert </Button>
  </form>
  );
  
}
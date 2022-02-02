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
       setProduct(prd);                         //update produc
    }getData();                                 //call getData
  },[]);                                        //call only when app is render
  return Object.keys(product).length > 0?<Update product={product} id={id}/>:" ";    //call update component when product has some data
}                                                                                    // empty object is true ,so checking for keys length

function Update({product}) {
  const history=useHistory();
   console.log(product.id);

   async function edit(values){
    console.log("after-update",values);
    const data=await fetch(
      `https://6166c4e513aa1d00170a6713.mockapi.io/products/${product.id}`,
       {method:"PUT",
         body:JSON.stringify(values),
         headers:{"Content-Type":"application/json",}
        }
      );
      history.push("/desserts")    //after editing change go to /desserts 
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
     protein:yup.number().required(),
  
  })

  const {handleSubmit,values,handleChange,handleBlur,errors,touched}=useFormik({

     initialValues:{
       // name:(product.name),
       // image:(product.image),
       // calories:(product.calories),
       // fat:(product.fat),
       // cabs:(product.cabs),
       // protein:(product.protein),
       ...product
     },
     validationSchema:formvalid,
     // when there's no error only then onSubmit will be called
     onSubmit:(values)=>{
       console.log("onsubmit",values);
       // update the  product data
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
       id="protein"
       name="protein"
       value={values.protein}
       onChange={handleChange}
       onBlur={handleBlur}  
       label="Protien" 
       variant="filled" 
       helperText={errors.protein&&touched.protein&&errors.protein}
     />
     <Button  type="submit"  variant="outlined">Update the changes </Button>
  </form>
  );
  
}
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useHistory} from 'react-router';
import { useFormik } from "formik";
import * as yup from "yup";

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

export function Add(params) {

  const history=useHistory();

   async function addNew(values) {
        console.log(values);
       const data=await fetch(
          "https://6166c4e513aa1d00170a6713.mockapi.io/products",
           {method:"POST",
             body:JSON.stringify(values),
             headers:{"Content-Type":"application/json",}
            }
          );
          history.push("/desserts")

  }
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
      addNew(values); 
    }
  });
  return (
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
          helperText={errors.name&&touched.name&&errors.image}
       />
       <TextField 
          id="calories"
          name="calories"
          value={values.calories}
          onChange={handleChange}
          onBlur={handleBlur} 
          label="Calories" 
          variant="filled" 
          helperText={errors.name&&touched.name&&errors.calories}
        />
       <TextField 
          id="fat"
          name="fat"
          value={values.fat}
          onChange={handleChange}
          onBlur={handleBlur} 
         label="Fats" 
         variant="filled" 
         helperText={errors.name&&touched.name&&errors.fat}
        />
       <TextField 
          id="cabs"
          name="cabs"
          value={values.cabs}
          onChange={handleChange}
          onBlur={handleBlur} 
         label="Cabs" 
         variant="filled"
         helperText={errors.name&&touched.name&&errors.cabs} 
        />
       <TextField 
         id="protien"
         name="protien"
         value={values.protien}
         onChange={handleChange}
         onBlur={handleBlur}  
         label="Protien" 
         variant="filled" 
         helperText={errors.name&&touched.name&&errors.protien}
       />
       <Button  type="submit"  variant="outlined">Add Dessert </Button>
    </form>
  )}
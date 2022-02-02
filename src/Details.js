import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


export function Details() {
  const {id}=useParams();
  const history=useHistory();
  // console.log(id);
  const [product,setProduct]=useState({});

    
  useEffect(()=>{
    async function getData() {
      const data= await fetch(`https://6166c4e513aa1d00170a6713.mockapi.io/products/${id}`);
      const prd=await data.json();
      console.log(prd);
       setProduct(prd);
      console.log("setproducts",product);
    }getData();
  },[]);  //called only when component is mounted/render
  return (
    <div className="details">
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <p>per 100 grams</p>
             <p> all the below contents are in grams
            </p>
           <p> Calories:{product.calories} </p>
            <p>fat:{product.fat}</p>
           <p> cabs:{product.cabs}</p>
           <p>protein:{product.protein}</p> 
            
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button
      onClick={()=>history.goBack()}
       variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
        Back
      </Button>
      </CardActions>
    </Card>
    </div>
  );
}
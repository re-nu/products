import { useParams, useHistory  } from 'react-router';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export function Delete() {
  // get the valiable from url useParams is used
  const {id}=useParams();
  const history=useHistory();
  async function deleteD() {
    const data=await fetch(
      `https://productsd.herokuapp.com/product/${id}`,
       {method:"DELETE"}
    );
    // after deleting go to /desserts url page
    history.push("/desserts")
  }
  return (
    <div className="delete">
         <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Are you sure you want to delete ?
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
        onClick={()=>history.goBack()}
        size="small">Back</Button>
        <Button 
        onClick={deleteD}
        size="small">Delete</Button>
      </CardActions>
    </Card>

    </div>
  );
}
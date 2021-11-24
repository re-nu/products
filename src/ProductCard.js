import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useHistory } from 'react-router';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


export function ProductCard({ name, image, id }) {
    const history=useHistory();
    console.log(id);
  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      component="img"
      height="160"
      height="140"
      image={image}
      alt={name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {name} 
      </Typography>
      
    </CardContent>
    <CardActions>
      <IconButton
           onClick={()=>history.push("/desserts/"+id)}
           edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <InfoIcon />
          </IconButton>
          <IconButton
           onClick={()=>history.push("/delete/"+id)}
           edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <DeleteIcon />
          </IconButton>
          <IconButton
           onClick={()=>history.push("/edit/"+id)}
           edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <EditIcon />
          </IconButton>
    </CardActions>
  </Card>
  );
}
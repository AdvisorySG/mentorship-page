import LazyLoad from "react-lazyload";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import "./profile-card.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 240,
  },
  media: {
    height: 240,
    width: 240,
  },
});

export default function ProfileCard({ mentor, onReadMore }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={onReadMore}>
        <CardMedia
          className={classes.media}
          image={process.env.PUBLIC_URL + mentor.thumbnailImageUrl}
          title={mentor.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {mentor.name}
          </Typography>

          {/* if {mentor.role} && {mentor.organisation} { */}
            <Typography variant="body2" color="textSecondary" component="p">
              {mentor.role}, {mentor.organisation}
            </Typography>
          {/* } */}
          <Divider />

          <Chip
            size="small"
            label={mentor.industry}
            color="primary"
          />

          {/* if {mentor.industry} { */}
            {/* <Typography variant="body2" color="textSecondary" component="p">
              Industry: {mentor.industry}  
            </Typography> */}
          {/* } */}
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


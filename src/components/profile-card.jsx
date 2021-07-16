import LazyLoad from "react-lazyload";
import React from "react";

import "./profile-card.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
  root: {
    maxWidth: 240,
    margin: 5,
    boxShadow: "4px 4px 2px #dedede",
    backgroundColor: "#f0f0f0",
  },
  media: {
    height: 240,
    width: 240,
  },
  chip: {
    maxWidth: 200,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

export default function ProfileCard({ mentor, onReadMore }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea onClick={onReadMore}>
        <LazyLoad height={240} offset={720} once>
          <CardMedia
            className={classes.media}
            image={process.env.PUBLIC_URL + mentor.thumbnailImageUrl}
            title={mentor.name}
          />
        </LazyLoad>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {mentor.name}
          </Typography>
          {mentor.role && mentor.organisation && (
            <Typography variant="body2" color="textSecondary" component="p">
              {mentor.role}, {mentor.organisation}
            </Typography>
          )}
          {mentor.industries.map((industry, index) => {
            return (
              <Chip
                key={index}
                className={classes.chip}
                size="small"
                label={industry}
                color="primary"
              />
            );
          })}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

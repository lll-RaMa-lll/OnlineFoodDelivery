import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Delete, Edit, Warning } from '@material-ui/icons';
import Picture from '../../assets/default_food.jpg'
import { Rating } from '@material-ui/lab';
import { Link } from 'react-router-dom'
import { arrayBufferToBase64 } from '../common/helper/imageConversion';

const useStyles = makeStyles({
    root: {
        width: "12em",
        height: "12.5em",
        background: "#FF5544",
        borderRadius: "1em",
        margin: "1em 1em 1em 1em"
    },
    text: {
        color: "#FFF",
        margin: "0px 0px 0px",
        position: "relative",
        top: "-1.5em",
        textShadow: "1px 1px 5px black",
        textAlign: "center",
    },
    button: {
        color: "#FFF",
        padding: "0px",
        minWidth: "3em",
    },
    buttons: {
        padding: "0px",
        position: "relative",
        top: "-1.5em",
        alignContent: "center",
        justifyContent: "space-evenly"
    },
    rating: {
        position: "relative",
        top: "-1.2em",
        left: "20%"
    },
});

export default function MediaCard(props) {
    let ItemName = props.name ? props.name : "Item Name";
    let active = props.isAvailiable ? props.isAvailiable : false;
    let rating = props.rating ? props.rating : 0.0;
    let image = props.image ? props.image : Picture;

    const classes = useStyles();
    let path = props.path ? props.path : "/"

    return (
        <Link to={path} style={{ textDecoration: 'none' }}>
            <Card className={classes.root} style={{ backgroundColor: props.color }}>
                <CardActionArea>
                    {props.image != undefined &&
                        <CardMedia
                            component="img"
                            height="160vw"
                            src={`data:${image.contentType};base64,${arrayBufferToBase64(image.data.data)}`}
                            title="Food">
                        </CardMedia>
                    }
                    {props.image == undefined &&
                        <CardMedia
                            component="img"
                            height="160vw"
                            src={Picture}
                            title="Food">
                        </CardMedia>
                    }
                </CardActionArea>
                <Typography gutterBottom variant="h5" component="h2" className={classes.text}>
                    {ItemName}
                </Typography>
                {props.type == 'food' &&

                    <CardActions className={classes.buttons}>
                        <Button size="small" className={classes.button}>
                            <Edit />
                        </Button>
                        <Button size="small" className={classes.button}>
                            <Warning />
                        </Button>
                        <Button size="small" className={classes.button}>
                            <Delete />
                        </Button>
                    </CardActions>

                }
                {props.type != 'food' &&

                    <Rating readOnly value={rating} precision={0.1} className={classes.rating} />

                }
            </Card>
        </Link>
    );
}

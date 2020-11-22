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

const useStyles = makeStyles({
    root: {
        width: "12em",
        height: "12.5em",
        background: "#FF5544",
        borderRadius: "1em",
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
    }
});

export default function MediaCard(props) {
    let ItemName = props.name ? props.name : "Item Name";
    let active = props.isAvailiable ? props.isAvailiable : false;

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="160vw"
                    image={Picture}
                    title="Food">
                </CardMedia>
            </CardActionArea>
            <Typography gutterBottom variant="h5" component="h2" className={classes.text}>
                {ItemName}
            </Typography>
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
        </Card>
    );
}

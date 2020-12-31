import React, { } from 'react';
import { } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { } from '@material-ui/icons';
import Food from '../../assets/default_food.jpg'
import Counter from './counter';

const useStyles = makeStyles({
    item: {
        display: "flex",
        padding: "0vw 2vw",
        width: "90%",
        maxHeight: "15vw",
        borderBottom: "1px solid #888"
    },
    photo: {
        height: "10vw",
        width: "10vw",
        padding: "1vw",
        objectFit: "cover",
        borderRadius: "2vw"
    },
    text: {
        width: "80vw",
        height: "15vw",
        padding: "1vw",
        color: "#FFF"
    },
    quantity: {
        width: "10vw",
        padding: "10vw 20vw",
    }
});

function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

export default function MenuItem(props) {

    const classes = useStyles();
    let image = (props.image) ? (props.image) : Food;
    let itemName = (props.name) ? (props.name) : ("Item Name");
    let price = (props.price) ? (props.price) : ("100");
    let description = (props.description) ? (props.description) : ("Description of the item goes here");
    let {amount,setAmount} = props
    return (
        <div className={classes.item}>
            {props.image != undefined &&
                <img src={`data:${image.contentType};base64,${arrayBufferToBase64(image.data.data)}`} className={classes.photo}></img>
            }
            {props.image == undefined &&
                <img src={Food} className={classes.photo}></img>
            }
            <div className={classes.text}>
                <h4>{itemName}<br /><br />₹{price}</h4>
                <p>{description}</p>
            </div>
            <div style={{ position: "relative", top: "2em" }}>
                <Counter item={props.item} setAmount={setAmount} amount={amount} price={price} className={classes.quantity}></Counter>
            </div>
        </div>
    );
}
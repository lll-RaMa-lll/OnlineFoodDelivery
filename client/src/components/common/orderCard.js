import React, { } from 'react';
import { Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Check, Close } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        margin: '1em',
        padding: '0em 1em',
        width: '90%',
        minHeight: '10em',
        backgroundColor: '#444',
        color: '#FFF',
        borderRadius: '1em'
    },
    heading: {
        display: 'flex',
        alignItems: 'center',
        padding: '0em 1em',
        borderBottom: "1px solid #888"
    },
    items: {
        display: 'grid',
        gridTemplateColumns: '40% 20% 20% 20%',
        padding: '1em 2em',
        alignContent: 'center',
    },
    buttonsAccept: {
        border: "1px solid #888",
        borderRadius: "3em",
        margin: "1em 2em",
        color: "#44FF44",
    },
    buttonReject: {
        border: "1px solid #888",
        borderRadius: "3em",
        margin: "1em 0em",
        color: "#FF5544",
    },
});

export default function OrderCard(props) {
    const classes = useStyles();
    let customerName = (props.customer_name) ? (props.customer_name) : ("Customer Name");
    let orderID = (props._id) ? (props._id) : ("xxxxxxxx");
    let item_list = (props.item_list) ? (props.item_list) : ({});
    let orderAmount = (props.orderAmount) ? (props.orderAmount) : (100);

    return (
        <div className={classes.root}>
            <div className={classes.heading}>
                <h3>Order</h3>
                <p style={{ padding: "0em 1em" }}>( ID : {orderID} )</p>
            </div>
            <div className={classes.items}>
                <div>
                    <div>
                        Chicken Bharta
                    </div>
                    <div>
                        Laccha Paratha
                    </div>
                    <div style={{ borderBottom: '1px solid #888' }}><br /></div>
                </div>
                <div>
                    <div>
                        x2
                    </div>
                    <div>
                        x8
                    </div>
                    <div>
                        <div style={{ borderBottom: '1px solid #888' }}><br /></div>
                        Total Amount:
                    </div>
                </div>
                <div>
                    <div>
                        ₹ 100
                    </div>
                    <div>
                        ₹ 100
                    </div>
                    <div>
                        <div style={{ borderBottom: '1px solid #888' }}><br /></div>
                        ₹ 200
                    </div>
                </div>
                <div>
                    <Button className={classes.buttonsAccept}><Check /></Button>
                    <Button className={classes.buttonReject}><Close /></Button>
                </div>
            </div>
        </div>
    );
}
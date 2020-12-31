import React, { useState } from 'react';
import { Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Check, Close } from '@material-ui/icons';
import {socket} from '../../socket'


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

export default function OrderCard({item,handleYes,handleNo,visible,setVisible}) {


    const [accepted, setAccepted] = useState(false)

    const classes = useStyles();
    let customerId = (item.customer) ? (item.customer) : ("Customer Name");
    let orderID = (item._id) ? (item._id) : ("xxxxxxxx");
    let item_list = (item.item_list) ? (item.item_list) : ({});
    let orderAmount = (item.orderAmount.base_price) ? (item.orderAmount.base_price) : (100);

    let totalAmount = 0

    console.log(item)






    return (
        <div className={classes.root}>
            <div className={classes.heading}>
                <h3>Order</h3>
                <p style={{ padding: "0em 1em" }}>( ID : {orderID} )</p>
            </div>
            <div className={classes.items}>
                <div>
                    {
                        item.item_list.map((item)=>{
                            return
                            (<div>
                                {item.name}
                            </div>)
                        })
                    }
                    {/* <div>
                        Chicken Bharta
                    </div>
                    <div>
                        Laccha Paratha
                    </div> */}
                    <div style={{ borderBottom: '1px solid #888' }}><br /></div>
                </div>
                <div>
                    {
                        item.item_list.map(item=>{
                            return(
                                <div>
                                    x{item.count}
                                </div>
                            )

                        })
                    }
                    {/* <div>
                        x2
                    </div>
                    <div>
                        x8
                    </div> */}
                    <div>
                        <div style={{ borderBottom: '1px solid #888' }}><br /></div>
                        Total Amount:
                    </div>
                </div>
                <div>
                    {
                        item.item_list.map(item=>{
                            totalAmount+=(100*item.count)
                            return(
                                <div>
                                    ₹ 100
                                </div>
                            )
                        })
                    }
                    {/* <div>
                        ₹ 100
                    </div>
                    <div>
                        ₹ 100
                    </div> */}
                    <div>
                        <div style={{ borderBottom: '1px solid #888' }}><br /></div>
                            ₹{totalAmount.toString()}
                    </div>
                </div>
                <div>
                   
                   {visible && <Button className={classes.buttonsAccept} onClick={handleYes}><Check /></Button>}
                   {visible && <Button className={classes.buttonReject} onClick={handleNo} ><Close /></Button>}
                    
                </div>
            </div>
        </div>
    );
}
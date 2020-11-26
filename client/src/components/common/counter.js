import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { } from '@material-ui/icons'

const useStyles = makeStyles({
    outerBox: {
        width: "6em",
        height: "2em",
        borderStyle: "solid",
        borderColor: "#888",
        borderWidth: "2px",
        borderRadius: "1em",
        display: "flex",
        justifyContent: "space-around",
        color: "#FFF"
    },
    buttons: {
        maxHeight: "2em",
        color: "#FF5544"
    }
});
export default function Counter() {
    const [count, setCount] = useState(0);
    const classes = useStyles();

    function decrease() {
        setCount(prevCount => (prevCount < 1) ? 0 : prevCount - 1)
    }
    function increase() {
        setCount(prevCount => prevCount + 1)
    }

    if (count == 0) {
        return (
            <div className={classes.outerBox}>
                <span></span><span></span>
                <span style={{ position: "relative", top: "0.3em" }}>Add</span>
                <IconButton size="small" className={classes.buttons} onClick={increase}>+</IconButton>
            </div>
        )
    }
    else {
        return (
            <div className={classes.outerBox}>
                <IconButton size="small" fullwidth="true" className={classes.buttons} onClick={decrease}>-<span style={{ color: "#888", position: "relative", left: "0.2em" }}>|</span></IconButton>
                <span style={{ position: "relative", top: "0.3em" }}>{count}</span>
                <IconButton size="small" fullwidth="true" className={classes.buttons} onClick={increase}><span style={{ color: "#888", position: "relative", right: "0.2em" }}>|</span>+</IconButton>
            </div >
        )
    }
}
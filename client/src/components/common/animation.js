import { makeStyles } from '@material-ui/core'
import React from 'react'
import rider from '../../assets/rider.png'
import shop from '../../assets/shop.png'
import flag from '../../assets/flag.png'
import styled, { keyframes, css } from 'styled-components'
import { Flag, FlagRounded, Height } from '@material-ui/icons';

const useStyles = makeStyles({
});

export default function Animation(props) {
    const classes = useStyles();
    const move1 = keyframes`
    0% {
    right: 500px;
    }
    100% {
    right:0px;
    }
    `
    const move2 = keyframes`
    0% {
    width: 50px;
    }
    100% {
    width:550px;
    }
    `
    let time = props.time ? props.time : 10;
    const animation = props =>
        css`
    ${move1} ${time}s linear 1;
    `
    const animation2 = props =>
        css`
    ${move2} ${time}s linear 1;
    `

    const Animated = styled.div`
    animation: ${animation};
    `
    const Animated2 = styled.div`
    animation: ${animation2};
    `
    return (
        <div style={{ position: 'relative', left: '50vw' }}>
            <img src={shop} style={{ position: 'relative', left: '-43vw', top: '110px' }}></img>
            <Animated style={{ position: 'relative' }}>
                <img src={rider}></img>
            </Animated>
            <Animated2 style={{ background: '#FFF', position: 'relative', right: '440px', height: '2px', width: '550px', top: '-4px' }}>
                <div></div>
            </Animated2>
            <img src={flag} style={{ position: 'relative', left: '110px', top: '-105px' }}></img>
        </div>
    )
}
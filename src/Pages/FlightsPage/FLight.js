import React from "react";
import styles from './Flight.module.css'
import planeIcon from '../../Images/PlaneIcon.png'
import likeIcon from '../../Images/likeIcon.png'
import selectedLikeIcon from '../../Images/selectedLikeIcon.png'
import {useDispatch} from "react-redux";

//A component for each flight. Accepts data from the props. Dispatch for every like/unlike action

const Flight = (props) => {
    const dispatch = useDispatch()
    return <>
        <div className={styles.flightContainer}>
            <div className={styles.planeIcon}>
                <img src={planeIcon} alt={'plane icon'}/>
            </div>
            <div className={styles.cities}>
                <span>{props.originCity} ({props.originCode})</span> <span> &rarr; </span>
                <span>{props.destinationCity} ({props.destinationCode})</span>
            </div>

            {props.inFavorites
                ? <div className={styles.likeIcon}>
                    <img alt={'selected like icon'}
                         onClick={() => {
                        dispatch({type: 'REMOVE_FROM_FAVORITES', payload: props.quote})
                    }} src={selectedLikeIcon}/>
                </div>
                : <div className={styles.likeIcon}>
                    <img alt={'unselected like icon'}
                        onClick={() => {
                        dispatch({type: 'ADD_TO_FAVORITES', payload: props.quote})
                    }} src={likeIcon}/>
                </div>
            }


            <div className={styles.date}>
            <span>{new Date(Date.parse(props.date)).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}</span>
                <span> &#8213;</span>
                <span> {new Date(Date.parse(props.time)).toLocaleTimeString('en-GB')}</span>
            </div>
            <div className={styles.carrier}>
                <span>{props.carrier}</span>
            </div>
            <div className={styles.price}>
                <span className={styles.priceLabel}>Prise: </span> <span>{props.price} {props.currencySymbol}</span>
            </div>
        </div>
        <hr/>
    </>
}
export default Flight
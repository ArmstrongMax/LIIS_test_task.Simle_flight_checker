import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import DayPicker from "react-day-picker";
import 'react-day-picker/lib/style.css';
import Flight from "./FLight";
import CityImagesCarousel from "./CityImagesCarousel";
import styles from './FlightsPage.module.css'
import calendarIcon from '../../Images/CalendarIcon.png'
import logoutButton from '../../Images/logoutIcon.png'
import _ from 'lodash';
import classNames from "classnames";
import {Redirect} from "react-router";

/*The flight page. useDispatch and useSelector for taking data from store and dispatch actions.
A calendar component from npm for selecting dates.
Redirect to the main page if no one is logged in.*/

const FlightsPage = () => {
    const dispatch = useDispatch()
    const date = useSelector(store => store.flights.date)
    const flights = useSelector(store => store.flights.flights)
    const favorites = useSelector(store => store.flights.favorites)
    const isSomeoneAuthorized = useSelector(store => store.auth.isSomeoneAuthorized)
    const [showCalendar, setShowCalendar] = useState(false)
    const carriers = flights.Carriers
    const currency = flights.Currencies
    const places = flights.Places

    const handleDayClick = (day) => {
        dispatch({type: "SET_DATE", payload: day})
    }

    if (!isSomeoneAuthorized) return <Redirect to={'/'}/>

    return <div className={styles.flightsPageContainer}>
        <div onClick={()=>{dispatch({type:'LOGOUT_REQUEST'})}} className={styles.logoutContainer}>
            <span>Выйти </span>
            <img src={logoutButton} alt={'logout icon'}/>
        </div>
        <div className={styles.flightsPage}>
            <div className={styles.title}>
                <span>Вылеты</span>
                <span> &rsaquo; </span>
                <span>{places?.find((item => item.PlaceId === flights?.Quotes?.[0].OutboundLeg.OriginId))?.IataCode}</span>
                <span>&#8213;</span>
                <span>{places?.find((item => item.PlaceId === flights?.Quotes?.[0].OutboundLeg.DestinationId))?.IataCode}</span>
                <span className={styles.date}>{date === 'anytime'
                    ? 'Случайные даты'
                    : date.toLocaleDateString('ru-RU',
                        {year: 'numeric', month: 'long', day: 'numeric'})}</span>
                <img className={classNames(styles.calendarIcon, {[styles.selectedCalendarIcon]:showCalendar})}
                     src={calendarIcon}
                     alt={'Calendar Icon'}
                     onClick={() => setShowCalendar(!showCalendar)}/>
            </div>
            {showCalendar &&
            <DayPicker
                className={styles.calendarContainer}
                onDayClick={handleDayClick}
                selectedDays={date}
                disabledDays={{before: new Date()}}
            />
            }
            <CityImagesCarousel/>

            <div className={styles.favoritesInfo}>
                <span>Добавлено в Избранное: </span>
                <span className={styles.favoritesCount}>{favorites.length} </span>
                <span>рейсов</span>
            </div>

            <div className={styles.flightsListContainer}>
                {flights?.Quotes?.map(q => {
                    return <div key={q.QuoteId}>
                        <Flight
                            originCity={places.find((item => item.PlaceId === q.OutboundLeg.OriginId)).CityName}
                            originCode={places.find((item => item.PlaceId === q.OutboundLeg.OriginId)).IataCode}
                            destinationCity={places.find((item => item.PlaceId === q.OutboundLeg.DestinationId)).CityName}
                            destinationCode={places.find((item => item.PlaceId === q.OutboundLeg.DestinationId)).IataCode}
                            date={q.OutboundLeg.DepartureDate}
                            time={q.QuoteDateTime}
                            carrier={carriers.find((item => item.CarrierId === q.OutboundLeg.CarrierIds[0])).Name}
                            price={q.MinPrice}
                            currencySymbol={currency[0].Symbol}
                            quote={q}
                            inFavorites={!!favorites.find(item => _.isEqual(item,q))}
                        />
                    </div>
                })}
            </div>
        </div>
    </div>
}
export default FlightsPage
import React from "react";
import style from '../css/welcomeCardStyle.module.css'

const WelcomeCard = ({userDetails}) => {
    return(
        <div className={style.mainContainer}>
            {userDetails && 
            <h1>Welcome back, {userDetails.firstName + ' ' + userDetails.lastName}</h1>
            }
         </div> 
        
    )
}

export default WelcomeCard
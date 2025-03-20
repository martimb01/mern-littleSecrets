import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoText from '../../assets/logotextv0.png'
import styles from '../css/navBarStyle.module.css'
import { getUserDetails } from "../../apiHelpers";

const NavBar = () => {
    const [userDetails, setUserDetails] = useState(null)
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const nav = useNavigate()


    useEffect(() => {
        getUserDetails(setUserDetails)
    }, [])

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible)
    }

    const  handleLogout = () => {
        localStorage.removeItem('token')
        console.log('Removed user token from local storage')
        nav('/')
    }

    return(
        <>
        <ul className={styles.navbar}>
            <li className={styles.items}>
                <img 
                src={logoText} 
                onClick={() => (nav('/homepage'))}
                alt="Site Logo"
                />
            </li>

            <li className={styles.items} 
            onClick={() => (nav('/postCreation'))}
            >
                Create Post
            </li>
        
            {userDetails && (
                <li className={styles.itemsProfileImg} onClick={toggleDropdown}>
                    <img src={userDetails.profileImgUrl} />
                    {dropdownVisible && (
                        <ul className={styles.dropdown}>
                            <li onClick={() => nav('/userUpdate')}>Edit profile</li>
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                    )}
                </li>
            )}
        </ul>
        </>
        )
    }
    


export default NavBar
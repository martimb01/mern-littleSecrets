import React from "react";
import { useNavigate } from "react-router-dom";
import logoText from '../../assets/logotextv0.png'
import styles from '../css/navBarStyle.module.css'

const NavBar = () => {
    const nav = useNavigate()
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

            <li className={styles.items} 
            onClick={() => (nav('/userUpdate'))}
            >
                Update User
            </li>

        </ul>
        </>
    )
}

export default NavBar
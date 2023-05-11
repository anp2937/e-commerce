import React from 'react'
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <section>
                <footer className="footer">

                    <div className="text-center p-3" style={{backgroundColor: "rgba(48, 246, 232, 0.15)"}}>
                        © 2023 Copyright&nbsp;
                        <NavLink className="text-light text-decoration-none" to="/">
                            AP
                        </NavLink>
                    </div>
                </footer>
            </section>
        </div>
    )
}

export default Footer;

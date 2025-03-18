import React from "react";
import NavbarItems from "./NavbarItems";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

export default function Navbar() {
    const [isToggle, setIsToggle] = React.useState(false);
    
    const navContainer = {
        visible: {
            x: 0,
            transition: {
                duration: 0.3
            }
        },
        hidden: {
            x: '100%',
            transition: {
                duration: 0.3
            }
        }
    }

    return(
        <header className="pt-10 px-8">
            {/* menu button */}
            <div className="flex justify-between w-full">
                <button 
                    className={`nav-toggle-btn ${isToggle ? 'active' : ''}`}
                    onClick={() => setIsToggle(!isToggle)}    
                >
                    <Icon icon={isToggle ? 'line-md:close': 'line-md:menu'} className="text-white text-2x1" />
                </button>
            </div>
            
            {/* overlay */}
            <div className={`nav-overlay ${isToggle ? 'active' : ''}`} onClick={() => setIsToggle(false)}></div>
            
            {/* navbar */}
            <AnimatePresence>

                <motion.nav 
                    className={`nav-menu ${isToggle ? 'active' : ''}`}
                    initial="hidden"
                    animate={isToggle ? "visible" : "hidden"}
                    exit="hidden"
                    variants={navContainer}
                >
                    <div className="nav-title">
                        Juan Loaiza
                    </div>
                    
                    <NavbarItems />

                    {/* Social Media Links */}
                    <div className="social-logos-container mt-6">
                        <a href="https://github.com/juanloaiza21" className="social-logo">
                        <Icon icon="brandico:github" width="40" height="40" />
                        </a>
                        <a href="https://www.linkedin.com/in/juan-david-loaiza-reyes-aaab88206/" className="social-logo">
                            <Icon icon="eva:linkedin-fill" width="40" height="40" />
                        </a>
                        <a href="https://www.instagram.com/juanloaiza21/" className="social-logo">
                            <Icon icon="ph:instagram-logo-bold" width="40" height="40" />
                        </a>
                    </div>
                </motion.nav>
            </AnimatePresence>
        </header>
    )
}

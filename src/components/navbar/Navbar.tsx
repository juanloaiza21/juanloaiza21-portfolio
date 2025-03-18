import React from "react";
import NavbarItems from "./NavbarItems";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

export default function Navbar() {
    const [isToggle, setIsToggle] = React.useState(false);
    
    const navContainer = {
        visible: {
            opacity: 1,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        hidden: {
            opacity: 0,
            transition: {
                when: 'afterChildren',
                staggerChildren: 0.1,
                delayChildren: 0.2,
                staggerDirection: -1
            }
        }
    }

    return(
        <header className="fixed top-0 left-0 w-full z-50">
            {/* menu button */}
            <div className="flex justify-start items-center px-3 py-2">
                <button className="relative flex justify-center w-12 h-12 rounded-full cursor-pointer z-[1000] border-none bg-primary"
                    onClick={() => setIsToggle(!isToggle)}    
                >
                    <Icon icon={isToggle ? 'line-md:close': 'line-md:menu'} className="text-white text-2x1" />
                </button>
            </div>
            {/* navbar */}
            <AnimatePresence>
                <div className="left-0">
                    {
                        isToggle && (
                            <motion.nav 
                                className="absolute top-0 left-0 z-[100] w-[250px] h-[80vh] rounded-[16px] bg-primary"
                                initial='hidden'
                                animate= {isToggle ? 'visible' : 'hidden'}
                                exit='hidden'
                                variants={navContainer}
                            >
                                <NavbarItems />
                            </motion.nav>
                        )
                    }
                </div>
            </AnimatePresence>
        </header>
    )
}

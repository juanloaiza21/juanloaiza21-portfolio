import React from 'react';
import { motion, Variants } from 'framer-motion';

const NavbarItems = () => {
    const items: {name: string, id: string}[] = [
        {name: 'Home', id: 'home'},
        {name: 'About', id: 'about'},
        {name: 'Projects', id: 'projects'},
        {name: 'Contact', id: 'contact'}
    ];

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    };

    const navList: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        },
        hidden: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        }
    };

    return (
        <motion.ul 
            className="pt-[100px] px-[70px] pb-[200px] space-y-6"
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={navList}
        >
            {items.map((item) => (
                <motion.li 
                    className="text=[20px] list-none cursor-pointer font-bold text-white"
                    key={item.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleScroll(item.id)}
                >
                    <p>{item.name}</p>
                </motion.li>
            ))}
        </motion.ul>
    );
};

export default NavbarItems;

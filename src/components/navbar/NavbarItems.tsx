import React from 'react';
import { motion, Variants } from 'framer-motion';


const NavbarItems = () => {
    const items: {name: string, id: string}[] = [
        {name: 'Home', id: 'home'},
        {name: 'About', id: 'about'},
        {name: 'Projects', id: 'projects'},
        {name: 'Contact', id: 'contact'}
    ]

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    }

    const navList: Variants = {
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
                straggerDirection: -1
            }
        }
    }

    return (
        <motion.ul 
            className='pt-[100px] px-[70px] pb-[200px] space-y-6'
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={navList}
        >
            {
                items.map( (item) => (
                    <motion.li 
                        key={item.id}
                        className='text-2xl font-semibold cursor-pointer'
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        onClick={() => handleScroll(item.id)}
                    >
                        <p>{item.name}</p>
                    </motion.li>
                ))
            }
        </motion.ul>
    )

};

export default NavbarItems;
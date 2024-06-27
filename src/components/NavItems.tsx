"use client"

import { PRODUCT_CATEGORIES } from "@/config";
import { useState, useRef, useEffect } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const NavItems = () => {

    const [activeIndex, setActiveIndex] = useState<number | null>(null);


    useEffect(() => {
       const handler = (e:KeyboardEvent) => {
        if (e.key === "Escape") {
            setActiveIndex(null);
        }
       } 

       document.addEventListener("keydown", handler);
       return () => {
        document.removeEventListener("keydown", handler);
       }
    }, []);

    const isAnyOpen = activeIndex !== null;

    const navRef = useRef<HTMLDivElement | null>(null);

    useOnClickOutside(navRef, () => setActiveIndex(null));

    return (
        <div className="flex gap-4 h-full" ref={navRef}>
            {
                PRODUCT_CATEGORIES.map((category, index) => {

                    const handleOpen = () => {
                        if (activeIndex === index) {
                            setActiveIndex(null);
                        } else {
                            setActiveIndex(index);
                        }
                    }

                    const isOpen = index === activeIndex;

                    return (
                        <NavItem key={index} category={category} handleOpen={handleOpen} isAnyOpen={isAnyOpen} isOpen={isOpen} />
                    )
                })
            }
        </div>
    )
}

export default NavItems;


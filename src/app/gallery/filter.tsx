"use client";
import React, { useState, useEffect } from 'react';
import '@/src/app/gallery/gallery.css';
import '@/src/app/globals.css';
import { useRouter } from 'next/navigation';

export default function Filter({initialSearch}: {initialSearch: string})
{
  const filters = ["CS50xNepal", "CLI Training", "XTech 1.0", "XTech 3.0", "XTech  4.0", "Robotics Workshop", "Hardware Hackathon", "Handover Ceremony", "Python Training", "IOT Training", "Web Scraping", "Libre Office"]


  const [tagName, setTagName] = useState(initialSearch ?? "");

  const router = useRouter();

  useEffect(() => {
    setTagName(initialSearch);
  }, [initialSearch]);

  return (
    <>
        <div className="gallery-menu">
            <button className={`text-sm active ${ !tagName ? 'gallery-active': ''}`}   onClick={(e) => {
                e.preventDefault();
                router.replace("/gallery");
                router.refresh;
              }}>
              All
            </button>
            {filters.map((filter) => {
                return (
                <button className={`text-sm active ${ filter === tagName ? 'gallery-active': ''}`} key={filter} 
                    onClick = {(e) => {
                        e.preventDefault();
                        router.replace(`/gallery/?filter=${encodeURIComponent(filter)}`);
                        router.refresh();                            
                    }}>
                    {filter}
                </button>
                )
            })}
        </div>
    </>
  )
}
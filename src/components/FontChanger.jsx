import React, { useState, useEffect } from 'react';
import { Button, Input, List, Slider, Space } from 'antd';

const fonts = [
    { name: 'Roboto', url: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap' },
    { name: 'Open+Sans', url: 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap' },
    { name: 'Lora', url: 'https://fonts.googleapis.com/css2?family=Lora&display=swap' },
    { name: 'Montserrat', url: 'https://fonts.googleapis.com/css2?family=Montserrat&display=swap' },
    { name: 'Playfair+Display', url: 'https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap' },
    { name: 'Merriweather', url: 'https://fonts.googleapis.com/css2?family=Merriweather&display=swap' },
    { name: 'Raleway', url: 'https://fonts.googleapis.com/css2?family=Raleway&display=swap' },
    { name: 'Poppins', url: 'https://fonts.googleapis.com/css2?family=Poppins&display=swap' },
    { name: 'Pacifico', url: 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap' },
    { name: 'Lobster', url: 'https://fonts.googleapis.com/css2?family=Lobster&display=swap' },
    { name: 'Oswald', url: 'https://fonts.googleapis.com/css2?family=Oswald&display=swap' },
    { name: 'Nunito', url: 'https://fonts.googleapis.com/css2?family=Nunito&display=swap' },
    { name: 'Slabo+27px', url: 'https://fonts.googleapis.com/css2?family=Slabo+27px&display=swap' },
    { name: 'Bitter', url: 'https://fonts.googleapis.com/css2?family=Bitter&display=swap' },
    { name: 'Dancing+Script', url: 'https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap' },
    { name: 'Mochiy+Pop+P+One', url: 'https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&display=swap' },
    { name: 'Quicksand', url: 'https://fonts.googleapis.com/css2?family=Quicksand&display=swap' },
    { name: 'Zilla+Slab', url: 'https://fonts.googleapis.com/css2?family=Zilla+Slab&display=swap' },
    { name: 'Varela+Round', url: 'https://fonts.googleapis.com/css2?family=Varela+Round&display=swap' },
    { name: 'Righteous', url: 'https://fonts.googleapis.com/css2?family=Righteous&display=swap' },
    { name: 'Courgette', url: 'https://fonts.googleapis.com/css2?family=Courgette&display=swap' },
    { name: 'Tangerine', url: 'https://fonts.googleapis.com/css2?family=Tangerine&display=swap' },
    { name: 'Sacramento', url: 'https://fonts.googleapis.com/css2?family=Sacramento&display=swap' },
    { name: 'Alfa+Slab+One', url: 'https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap' },
    { name: 'Droid+Serif', url: 'https://fonts.googleapis.com/css2?family=Droid+Serif&display=swap' },
    { name: 'Amatic+SC', url: 'https://fonts.googleapis.com/css2?family=Amatic+SC&display=swap' },
    { name: 'Fira+Sans', url: 'https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap' },
    { name: 'Muli', url: 'https://fonts.googleapis.com/css2?family=Muli&display=swap' },
    { name: 'Ubuntu', url: 'https://fonts.googleapis.com/css2?family=Ubuntu&display=swap' },
    { name: 'Lato', url: 'https://fonts.googleapis.com/css2?family=Lato&display=swap' }
];

const FontChanger = () => {
    const [font, setFont] = useState('Roboto'); // Начальный шрифт

    const loadFonts = () => {
        fonts.forEach((font) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = font.url;
            document.head.appendChild(link);
        });
    };

    useEffect(() => {
        loadFonts();
    }, []);

    const getRandomFont = () => {
        const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
        setFont(randomFont.name); 
        const style = document.createElement('style');
        style.innerHTML = `* { font-family: '${randomFont.name}', sans-serif !important; }`;
        document.head.appendChild(style);
    };

    return (
        <div>
            <Button type="primary" onClick={getRandomFont} >
                Change font
            </Button>
        </div>
    );
};

export default FontChanger;

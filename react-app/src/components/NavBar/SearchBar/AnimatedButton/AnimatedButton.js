import React, { useState } from 'react';
import "./AnimatedButton.css"
const AnimatedButton = () => {

    const [effect, setEffect] = useState(false);

    const animate = () => {

        // Button begins to shake
        setEffect(true);

        // Buttons stops to shake after 2 seconds
        // setTimeout(() => setShake(false), 2000);

    }

    return(
        <button onClick = {animate} className = {effect ? `effect` : null}>Click me</button>
    );

}

export default AnimatedButton;

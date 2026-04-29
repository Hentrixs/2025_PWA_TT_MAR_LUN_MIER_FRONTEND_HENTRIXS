// Frontend/src/Screens/egg/egg.tsx

import './egg.css';

function Egg() {
    return (
        <div className="egg-screen">
            <img
                src="/cat-space.gif"
                alt="Nyan Cat"
                className="nyan-cat"
            />
            <h1 className="egg-text">¡Has encontrado el secreto! 🐱‍🚀</h1>
            <a href="/workspace-selector" className="back-link">Volver a la realidad</a>
        </div>
    )
}

export default Egg;

import { useEffect, useState } from 'react';
import { basketballTips, getRandomItem } from './data';
import { Activity, Dumbbell, Quote, LogOut, User } from 'lucide-react';

function Dashboard({ user, onReset }) {
    const [content, setContent] = useState(null);

    useEffect(() => {
        // Generate content once per session when dashboard mounts
        setContent({
            stretching: getRandomItem(basketballTips.stretching),
            drill: getRandomItem(basketballTips.drills),
            quote: getRandomItem(basketballTips.quotes),
        });
    }, []);

    if (!content) return null;

    const playerType = user.sex === 'male' ? 'Jugador' : user.sex === 'female' ? 'Jugadora' : 'Jugadorx';

    return (
        <div className="glass-container dashboard-container">
            <header className="dashboard-header">
                <h2>Entrenamiento de Hoy</h2>
                <div className="user-info">
                    <div className="user-badge">
                        <User size={16} />
                        {playerType} <span>|</span> {user.age} años
                    </div>
                    <button onClick={onReset} className="reset-btn" title="Cambiar Perfil">
                        <LogOut size={16} /> Salir
                    </button>
                </div>
            </header>

            <div className="cards-grid">
                <section className="card">
                    <div className="card-icon blue">
                        <Activity size={24} />
                    </div>
                    <h3>Prevención y Salud</h3>
                    <p>{content.stretching}</p>
                </section>

                <section className="card">
                    <div className="card-icon">
                        <Dumbbell size={24} />
                    </div>
                    <h3>Ejercicio de Pista</h3>
                    <p>{content.drill}</p>
                </section>

                <section className="card card-quote">
                    <Quote className="quote-icon" size={48} />
                    <blockquote>"{content.quote}"</blockquote>
                </section>
            </div>
        </div>
    );
}

export default Dashboard;

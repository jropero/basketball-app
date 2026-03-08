import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

function UserForm({ onSubmit }) {
    const [sex, setSex] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (sex && age) {
            onSubmit({ sex, age: parseInt(age, 10) });
        }
    };

    return (
        <div className="glass-container form-container">
            <h2>Perfil de Jugador</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="sex">Sexo</label>
                    <select
                        id="sex"
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                        required
                    >
                        <option value="" disabled>Selecciona una opción...</option>
                        <option value="male">Hombre</option>
                        <option value="female">Mujer</option>
                        <option value="other">Otro</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="age">Edad</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        min="5"
                        max="100"
                        placeholder="Ej. 25"
                        required
                    />
                </div>

                <button type="submit" className="btn-primary">
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        Entrar a la Pista <ArrowRight size={20} />
                    </span>
                </button>
            </form>
        </div>
    );
}

export default UserForm;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Formulario } from './formulario';
import { BuscaNome } from './busca-nome';
import { BuscaCPF } from './busca-cpf';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Formulario />} />
                <Route path="/candidatos/nome" element={< BuscaNome />} />
                <Route path="/candidatos/cpf" element={<BuscaCPF />} />
            </Routes>
        </Router>

    );
}

export default App;

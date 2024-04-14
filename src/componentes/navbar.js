import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Inscrever-se</Nav.Link>
                <Nav.Link as={Link} to="/candidatos/nome">Pesquisar candidato</Nav.Link>
                <Nav.Link as={Link} to="/candidatos/cpf">Pesquisar CPF</Nav.Link>
            </Nav>
        </Navbar>
    );
}

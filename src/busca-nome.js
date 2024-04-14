import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { NavigationBar } from './componentes/navbar';

export function BuscaNome() {
    const [candidatos, setCandidatos] = useState([]);
    const [parametroPesquisa, setParametroPesquisa] = useState("");

    function buscarCandidatos() {
        fetch("http://localhost:4000/candidatos",)
            .then(res => res.json())
            .then(res => {
                setCandidatos(res.listaCandidatos);
            })
            .catch(erro => {
                console.log('erro', erro)
            })
    }

    useEffect(() => {
        buscarCandidatos();
    }, [])

    const pesquisarCandidato = (nome) => {
        if (nome === undefined || nome === "") {
            buscarCandidatos()
        }
        else {
            fetch(`http://localhost:4000/candidatos/nome/${nome}`, { method: "GET" })
                .then(res => res.json())
                .then(res => {
                    setCandidatos(res.listaCandidatos)
                    console.log("res", res)
                })
                .catch(erro => {
                    console.log('erro', erro)
                })
        }
    }
    return (
        <Container fluid className='w-100 h-100 d-flex flex-column justify-content-center mt-5'>
            <NavigationBar />
            <Form className='w-100 bg-dark text-white p-3 d-flex justify-content-center flex-column'>
                <Form.Group className="mb-3" controlId="pesquisa">
                    <Form.Label>Pesquisar candidato por nome</Form.Label>
                    <Form.Control type="text" placeholder="Insira o nome do candidato" onChange={(e) => setParametroPesquisa(e.target.value)} />
                    <Button variant="primary" className='mt-5' onClick={() => pesquisarCandidato(parametroPesquisa)}>
                        Enviar
                    </Button>
                </Form.Group>
                <Form.Group className="mb-3" controlId="pesquisa">
                    <Form.Label>Candidatos</Form.Label>
                    {candidatos && candidatos.map((candidato) => (<Form.Control type="text" value={candidato.cand_nome} key={candidato.pk_cand_cpf} disabled className='mt-3' />))}
                </Form.Group>
            </Form>
        </Container>
    );
}
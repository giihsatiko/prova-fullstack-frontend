import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { NavigationBar } from './componentes/navbar';

export function BuscaCPF() {
    const [inscricoes, setInscricoes] = useState([]);
    const [parametroPesquisa, setParametroPesquisa] = useState("");

    const pesquisarInscricoes = (cpf) => {
        fetch(`http://localhost:4000/inscricoes/${cpf}`, { method: "GET" })
            .then(res => res.json())
            .then(res => {
                setInscricoes(res.listaInscricoes)
            })
            .catch(erro => {
                console.log('erro', erro)
            })
    }
    return (
        <Container fluid className='w-100 h-100 d-flex flex-column justify-content-center mt-5'>
            <NavigationBar />
            <Form className='w-100 bg-dark text-white p-3 d-flex justify-content-center flex-column'>
                <Form.Group className="mb-3" controlId="pesquisa">
                    <Form.Label>Pesquisar candidato inscrito por CPF</Form.Label>
                    <Row className='align-items-center justify-center'>
                        <Col>
                            <Form.Control type="text" placeholder="Insira o CPF do candidato" onChange={(e) => setParametroPesquisa(e.target.value)} />
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={() => pesquisarInscricoes(parametroPesquisa)}>
                                Enviar
                            </Button>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3" controlId="pesquisa">
                    {inscricoes && inscricoes.map((inscricao) => (
                        <Row key={inscricao.pk_inscricao_id} className='bg-white py-2 text-dark rounded mx-2 mt-3'>
                            <Col sm={2}>
                                <Form.Label>Id da inscrição:</Form.Label>
                                <Form.Control type="text" value={inscricao.pk_inscricao_id} disabled />
                            </Col>
                            <Col sm={10} className='mb-3'>
                                <Form.Label>CPF do candidato:</Form.Label>
                                <Form.Control type="text" value={inscricao.pk_cand_cpf} disabled />
                            </Col>
                            <Col>
                                <Form.Label>Código da vaga:</Form.Label>
                                <Form.Control type="text" value={inscricao.pk_vaga_codigo} disabled />
                            </Col>
                            <Col>
                                <Form.Label>Data da inscrição:</Form.Label>
                                <Form.Control type="text" value={inscricao.data_inscricao} disabled />
                            </Col>
                            <Col>
                                <Form.Label>Horário da inscrição:</Form.Label>
                                <Form.Control type="text" value={inscricao.horario_inscricao} disabled />
                            </Col>
                        </Row>
                    ))}
                </Form.Group>
            </Form>
        </Container>
    );
}
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { NavigationBar } from './componentes/navbar';
import { formatarData, formatarHorario } from './utils/formatar-data';

export function Formulario() {
  const [vagas, setVagas] = useState([]);
  const [vagaSelecionada, setVagaSelecionada] = useState(-1);
  const [cpf, setCpf] = useState("")
  const [inscricoesCandidato, setInscricoesCandidato] = useState([]);

  function buscarVagas() {
    fetch("http://localhost:4000/vagas")
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setVagas(res.listaVagas);
      })
      .catch(erro => {
        console.log('erro', erro)
      })
  }

  useEffect(() => {
    buscarVagas();
  }, [])

  function onVagaClick(e) {
    const id = e.target.value;
    if (vagas) {
      setVagaSelecionada(vagas[id]);
    }
  }

  function candidatar(listaInscricoes, cpf, vagaCodigo) {
    if (!listaInscricoes.includes(vagaCodigo)) {
      const obj = {
        cpfCandidato: cpf,
        codigoVaga: vagaCodigo,
        dataInscricao: formatarData(),
        horarioInscricao: formatarHorario()
      }
      fetch("http://localhost:4000/inscricoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj)
      })
        .then(res => res.json())
        .then(res => {
          alert(res.mensagem)
          console.log(res)
        })
        .catch(erro => {
          console.log('erro', erro)
        })
    }
    else alert("Candidato já cadastrado na vaga.")


  }

  function verificaInscricao(cpf, vagaCodigo) {
    return fetch(`http://localhost:4000/inscricoes/${cpf}`, { method: "GET" })
      .then(res => res.json())
      .then(res => {
        candidatar(res.listaInscricoes.map((inscricao) => inscricao.pk_vaga_codigo), cpf, vagaCodigo)
      })
      .catch(erro => {
        console.log('erro', erro)
      })
  }
  return (
    <Container fluid className='w-100 h-100 d-flex flex-column justify-content-center mt-5'>
      <NavigationBar />
      <Form className='w-100 bg-dark text-white p-3 d-flex justify-content-center flex-column'>
        <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" placeholder="Insira seu nome" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="nome">
          <Form.Label>CPF</Form.Label>
          <Form.Control type="text" placeholder="Insira seu CPF" onChange={(e) => setCpf(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="endereco">
          <Form.Label>Endereço</Form.Label>
          <Form.Control type="text" placeholder="Insira seu endereço" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="telefone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control type="text" placeholder="Insira o seu telefone" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pk_vaga_codigo">
          <Form.Label>Vaga</Form.Label>
          <Form.Select onClick={onVagaClick}>
            <option value="-1">Selecione a vaga que deseja se candidatar</option>
            {vagas && vagas.map((vaga) => (
              <option value={vaga.pk_vaga_codigo} key={vaga.pk_vaga_codigo}>{vaga.vaga_cargo}</option>
            ))}
          </Form.Select>
          <Form.Control type='text' placeholder="Salário" className='mt-3' disabled value={vagaSelecionada.vaga_salario} />
          <Form.Control type='text' placeholder="Cidade" className='mt-3' disabled value={vagaSelecionada.vaga_cidade} />
          <Form.Control type='number' placeholder="Quantidade" className='mt-3' disabled value={vagaSelecionada.vaga_quantidade} />
        </Form.Group>
        <Button variant="primary" className='mt-5' onClick={(e) => { e.preventDefault(); verificaInscricao(cpf, vagaSelecionada.pk_vaga_codigo) }} >
          Enviar
        </Button>
      </Form>
    </Container>
  );
}
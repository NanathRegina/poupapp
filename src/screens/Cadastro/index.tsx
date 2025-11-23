import { useState } from "react";
import {
  Section,
  Container,
  Title,
  Description,
  Illustration,
  SectionWrapper,
} from "./style.js";
import ilustracao from "../../assets/images/ilustracao-cadastro.png";
import { Form, useNavigate } from "react-router";
import Botao from "../../componentes/Botao/index.js";
import CampoTexto from "../../componentes/CampoTexto/index.js";
import Fieldset from "../../componentes/Fieldset/index.js";
import Label from "../../componentes/Label/index.js";
import { IUsuario } from "../../types/index.js";
import { criarUsuario } from "../../api/index.js";

const Cadastro = () => {
  // criacao de métrodo chamado Cadastro
  const [form, setForm] = useState<Omit<IUsuario, "id">>({
    nome: "",
    renda: 0,
  })
  // criando um estado chamado form cujo o tipo é IUsuario, definindo que não é 
  // obrigatório o atributo id nesse form
  // e uma função chamada setForm para alterar as propriedades do form 
  // form tem as propriedades nome e renda que iniciam com valores padrões

  const aoDigitarNoCampoTexto = (campo: "nome" | "renda", valor: string) =>{
  // método aoDigitarNoCampoTexto que recebe os parâmetros:
  // tipo -> que pode ser nome ou renda
  // valor -> que é do tipo string

    setForm((prev) => ({...prev, [campo]:valor}))
  // chamado a função setForm para atualizar o estado do form
  // obtendo o estado anterior do form e atualizando somente o que foi
  // alterado pelo usuário
  }


  const navigate = useNavigate();

  const aoSubmeterFormulario = async (evento: React.FormEvent) => {
    evento.preventDefault();
    // código que impede que o navegador envie o formulário e
    // recarregue a página antes de ser executado o trecho de código abaixo
    try{
      const novoUsuario = await criarUsuario(form)
    }catch(error){
      console.log(error)
    }

    navigate("/home");
  };

  return (
    <Section>
      <SectionWrapper>
        <Container>
          <Title>Configuração financeira</Title>
          <Description>
            Boas-vindas à plataforma que protege seu bolso! Antes de começar,
            precisamos de algumas informações sobre sua rotina financeira. Vamos
            lá?
          </Description>
          <Form>
            <Fieldset>
              <Label htmlFor="nome">Nome</Label>
              <CampoTexto
                type="text"
                name="nome"
                value={form.nome}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => aoDigitarNoCampoTexto("nome", e.target.value)}
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="renda">Renda mensal total</Label>
              <CampoTexto
                type="text"
                name="renda"
                value={form.renda}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => aoDigitarNoCampoTexto("renda", e.target.value)}
              />
            </Fieldset>
          </Form>
          <Botao $variante="primario" onClick={aoSubmeterFormulario}>
            Ir para o app
          </Botao>
        </Container>
        <Illustration
          src={ilustracao}
          alt="ilustração da tela de cadastro. Um avatar mexendo em alguns gráficos"
        />
      </SectionWrapper>
    </Section>
  );
};

export default Cadastro;

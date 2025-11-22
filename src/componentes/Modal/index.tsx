import React, { forwardRef, useImperativeHandle, useRef } from "react";
import {
  ButtonGroup,
  CloseButton,
  ModalContainer,
  ModalHeader,
} from "./style";
import Botao from "../Botao";

interface ModalProps {
  icon: React.ReactNode;
  titulo: string;
  children: React.ReactNode;
  aoClicar: () => void;
  cliqueForaModal?: boolean;
}

export interface ModalHandle {
  open: () => void;
  close: () => void;
}

const Modal = forwardRef<ModalHandle, ModalProps>(({
  icon,
  titulo,
  children,
  aoClicar,
  cliqueForaModal = true
}, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null); 
  // criando uma referência do Dialog

  const fechaModal = () => {
    dialogRef.current?.close()
  } 
  // método que acessa a funcão de fechar dentro do Dialog

  useImperativeHandle(ref, () => ({ 
    // hook que expõe somente os métodos personalidos open e close
    open: () => dialogRef.current?.showModal(),
    // open recebe um método que acessa a função de exibir modal dentro do Dialog
    close: fechaModal, 
    // aqui não estou executando o método fechaModal, só estou passando como referência
  }))
  

  const aoClicarForaModal = (evento: React.MouseEvent<HTMLDialogElement>) => {
    if (cliqueForaModal && evento.target === dialogRef.current){ 
      // se a variável cliqueForaModal fora true e 
      // se o elemento clicado(alvo do evento de clique) for a parte de fora do Dialog
      fechaModal() //aqui estou executando o método fechaModal
    }
  }

  return (
      <ModalContainer ref={dialogRef} onClick={aoClicarForaModal}>
        <ModalHeader>
          <div>
            {icon}
            {titulo}
          </div>
          <CloseButton  onClick={fechaModal}>x</CloseButton>
        </ModalHeader>
        {children}
        <ButtonGroup>
          <Botao $variante="secundario" onClick={fechaModal}>
            Cancelar
          </Botao>
          <Botao $variante="primario" onClick={() => {
            aoClicar()
            fechaModal()
          }}>
            Adicionar
          </Botao>
        </ButtonGroup>
      </ModalContainer>
  );
});

export default Modal;

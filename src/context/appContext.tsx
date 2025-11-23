import React, { createContext, useEffect, useState } from 'react'
import { IUsuario } from '../types'
import { criarUsuario, obterUsuarios } from '../api'

interface AppContextType {
  usuario: IUsuario | null;
  criaUsuario: (usuario: Omit<IUsuario, "id">) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<IUsuario | null>(null)

  const carregaDadosUsuario = async () => {
    try {
      const usuario = await obterUsuarios()
      if (usuario.length > 0) {
        setUsuario(usuario[0])
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    carregaDadosUsuario()
  }, [])

  const criaUsuario = async (usuario: Omit<IUsuario, "id">) => {
    try {
      const novoUsuario = await criarUsuario(usuario)
      setUsuario(novoUsuario)
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <AppContext.Provider value={{ usuario, criaUsuario }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
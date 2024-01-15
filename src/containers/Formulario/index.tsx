import { useDispatch } from 'react-redux'
import * as S from '../../css'
import { ChangeEvent, FormEvent, useState } from 'react'
import * as enums from '../../utils/enums/Tarefa'
import { cadastrar } from '../../store/reducers/tarefas'
import { useNavigate } from 'react-router-dom'

const Formulario = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState(enums.Prioridade.NORMAL)

  const cadastrarTarefa = (evento: FormEvent) => {
    evento.preventDefault()

    dispatch(
      cadastrar({
        titulo,
        prioridade,
        descricao,
        status: enums.Status.PENDENTE
      })
    )
    navigate('/')
  }

  function Titulo(evento: ChangeEvent<HTMLInputElement>) {
    return evento.target.value === ''
      ? setTitulo('Título')
      : setTitulo(evento.target.value)
  }

  function Descricao(evento: ChangeEvent<HTMLTextAreaElement>) {
    return evento.target.value === ''
      ? setDescricao('Descrição')
      : setDescricao(evento.target.value)
  }

  function Prioridade() {
    return (target: { value: enums.Prioridade }) => {
      setPrioridade(target.value as enums.Prioridade)
    }
  }

  return (
    <S.MainContainer>
      <S.TituloP>Nova tarefa</S.TituloP>
      <S.Form onSubmit={cadastrarTarefa}>
        <S.Campo
          value={titulo}
          onChange={Titulo}
          type="text"
          placeholder="Título"
        />
        <S.Campo
          value={descricao}
          onChange={Descricao}
          as="textarea"
          placeholder="Descrição da tarefa"
        />
        <S.Opcoes>
          <p>Prioridade</p>
          {Object.values(enums.Prioridade).map((prioridade) => (
            <S.Opcao key={prioridade}>
              <input
                value={prioridade}
                name="prioridade"
                type="radio"
                onChange={Prioridade}
                id={prioridade}
                defaultChecked={prioridade === enums.Prioridade.NORMAL}
              />{' '}
              <label htmlFor={prioridade}>{prioridade}</label>
            </S.Opcao>
          ))}
        </S.Opcoes>
        <S.BotaoSalvar type="submit">Cadastrar</S.BotaoSalvar>
      </S.Form>
    </S.MainContainer>
  )
}

export default Formulario

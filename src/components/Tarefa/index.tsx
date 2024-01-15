import { ChangeEvent, SetStateAction, useEffect, useState } from 'react'
import * as S from '../../css'
import { useDispatch } from 'react-redux'
import { remover, editar, alteraStatus } from '../../store/reducers/tarefas'
import TarefaClass from '../../models/Tarefa'
import * as enums from '../../utils/enums/Tarefa'

type Props = TarefaClass

const Tarefa = ({
  descricao: descricaoOriginal,
  prioridade,
  status,
  titulo,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescricao(descricaoOriginal)
    }
  }, [descricaoOriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
  }

  function atualizarDescricao() {
    return (e: { target: { value: SetStateAction<string> } }) =>
      setDescricao(e.target.value)
  }

  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    console.log(evento.target.checked)
    dispatch(alteraStatus({ id, finalizado: evento.target.checked }))
  }

  return (
    <S.CardTarefa>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          id={titulo}
          checked={status === enums.Status.CONCLUIDA}
          onChange={alteraStatusTarefa}
        />
        <S.Titulo>
          {estaEditando && <em>Editando: </em>}
          {titulo}
        </S.Titulo>
      </label>
      <S.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>
      <S.Descricao
        disabled={!estaEditando}
        value={descricao}
        onChange={atualizarDescricao()}
      />
      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <S.BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    descricao,
                    prioridade,
                    status,
                    titulo,
                    id
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </S.BotaoSalvar>
            <S.BotaoCancelarRemover
              onClick={() => {
                cancelarEdicao()
              }}
            >
              Cancelar
            </S.BotaoCancelarRemover>
          </>
        ) : (
          <>
            <S.BotaoEditar onClick={() => setEstaEditando(true)}>
              Editar
            </S.BotaoEditar>
            <S.BotaoCancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </S.BotaoCancelarRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.CardTarefa>
  )
}

export default Tarefa

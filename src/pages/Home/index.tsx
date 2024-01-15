import BotaoAdicionar from '../../components/BotaoAdicionar'
import BarraLateral from '../../containers/BarraLateral'
import ListaDeTarefa from '../../containers/ListaDeTarefa'

const Home = () => {
  return (
    <>
      <BarraLateral mostrarFiltros={true} />
      <ListaDeTarefa />
      <BotaoAdicionar />
    </>
  )
}

export default Home

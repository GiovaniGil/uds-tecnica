import Sabor from '../sabor/SaborModel'
import Tamanho from '../tamanho/TamanhoModel'

const Pedido = {
  'id': null,
  'clienteNome': null,
  'tamanhoProduto': Tamanho,
  'saborProduto': Sabor,
  'personalizacao': []
}
export default Pedido

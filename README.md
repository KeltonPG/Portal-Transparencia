# Portal da Transparência do Maranhão

Uma aplicação web moderna para visualização e consulta de dados de transparência do estado do Maranhão, desenvolvida com React e TypeScript.

## 🚀 Funcionalidades

- **Dashboard Interativo**: Visualização de gastos, órgãos e licitações
- **Filtros Avançados**: Busca por ano, mês e código da unidade
- **Tabela de Unidades**: Lista completa de unidades gestoras com dados detalhados
- **Modal de Notas**: Visualização detalhada de notas fiscais por despesa
- **Interface Responsiva**: Design adaptável para diferentes dispositivos
- **Carregamento Inteligente**: Indicadores de carregamento com possibilidade de cancelamento

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server
- **SCSS/CSS Modules** - Estilização modular
- **React Icons** - Ícones para a interface

## 📦 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/KeltonPG/Portal-Transparencia.git
   cd Portal-Transparencia
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:5173
   ```

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── AreaPesquisa/    # Inputs de busca
│   ├── Cabecalho/       # Cabeçalho da aplicação
│   ├── CartaoSumario/   # Cards de resumo
│   ├── ErroMensagem/    # Componente de erro
│   ├── Loader/          # Indicador de carregamento
│   ├── NotasGastos/     # Modal de notas fiscais
│   └── TabelaUnidades/  # Tabela de unidades
├── hooks/               # Custom hooks
├── pages/               # Páginas da aplicação
├── services/            # Serviços de API
├── styles/              # Estilos globais
├── types/               # Definições de tipos
└── utils/               # Utilitários
```

## 🎯 Como Usar

### Dashboard Principal
- Visualize o total de gastos por ano
- Consulte a quantidade de órgãos
- Acesse informações sobre licitações

### Filtros de Busca
- **Ano**: Digite o ano desejado (ex: 2023)
- **Mês**: Digite o mês (ex: 02)
- **Código da Unidade**: Pesquise por código específico

### Visualização de Notas
1. Clique em qualquer linha da tabela de despesas
2. O modal abrirá com o carregamento das notas
3. Visualize os detalhes das notas fiscais
4. Use o botão "X" para cancelar o carregamento se necessário

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Visualiza o build de produção
npm run lint         # Executa o linter
```


## 🎨 Design System

- **Cores**: Paleta baseada em azuis e cinzas
- **Tipografia**: Inter como fonte principal
- **Espaçamento**: Sistema de espaçamento consistente
- **Bordas**: Cantos arredondados (8px - 12px)

## 🔍 Funcionalidades Técnicas

- **CSS Modules**: Estilos isolados por componente
- **TypeScript**: Tipagem forte para melhor manutenibilidade
- **Hooks Customizados**: Lógica reutilizável
- **Tratamento de Erros**: Interface amigável para erros
- **Loading States**: Indicadores visuais de carregamento

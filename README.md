# Exercise API - Documentação

Este repositório contém a API de exercícios baseada no projeto original de Yuhonas, disponível [aqui](https://github.com/yuhonas/free-exercise-db). A API fornece dados de diversos exercícios de musculação, com informações como nome, músculos primários, equipamentos utilizados e instruções.

## Endpoints Disponíveis:

### Base URL

A URL base para todas as requisições é:

[API](https://libapi.vercel.app/api/exercises)


### 1. Listar Todos os Exercícios

**Descrição**:<br>Retorna uma lista completa de exercícios, com informações detalhadas.

**Método**: `GET`

**Endpoint**: 
``/api/exercises``

**Resposta**:

```json
[
  {
    "id": "1",
    "name": "3/4 Sit-Up",
    "force": "pull",
    "level": "beginner",
    "mechanic": "compound",
    "equipment": "body only",
    "primaryMuscles": ["abdominals"],
    "secondaryMuscles": ["obliques"],
    "instructions": [
      "Deite-se de costas com os joelhos dobrados e os pés no chão.",
      "Coloque suas mãos atrás da cabeça.",
      "Levante a parte superior do seu corpo até cerca de 45 graus e depois desça."
    ],
    "category": "strength",
    "images": [
      "/exercises/3_4_Sit-Up/0.jpg",
      "/exercises/3_4_Sit-Up/1.jpg"
    ]
  },
]
```
## 2. Filtrar Exercícios por Parâmetros

**Descrição:**<br>Permite filtrar exercícios com base em parâmetros específicos.

Método: ``GET``

**Endpoint:**

``/api/exercises``

**Parâmetros de Query:**

|Parâmetro| Tipo | Descrição|
|---------|------|----------|
|name|	string |  Filtra  por nome do exercício (ex: 3/4 Sit-Up) |
|primaryMuscles|	string |	Filtra pelo músculo primário envolvido (ex: abdominals) |
|equipment |	string |	Filtra por equipamento necessário (ex: body only) |
|level |	string |	Filtra por nível de dificuldade (beginner, intermediate, advanced) |
|category |	string |	Filtra pela categoria (ex: strength, cardio) |

**Exemplo de Requisição:**

```sql
GET /api/exercises?level=beginner&equipment=body%20only
```
**Resposta:**

```json
[
  {
    "id": "1",
    "name": "3/4 Sit-Up",
    "force": "pull",
    "level": "beginner",
    "mechanic": "compound",
    "equipment": "body only",
    "primaryMuscles": ["abdominals"],
    "secondaryMuscles": ["obliques"],
    "instructions": [
      "Deite-se de costas com os joelhos dobrados e os pés no chão.",
      "Coloque suas mãos atrás da cabeça.",
      "Levante a parte superior do seu corpo até cerca de 45 graus e depois desça."
    ],
    "category": "strength",
    "images": [
      "/exercises/3_4_Sit-Up/0.jpg",
      "/exercises/3_4_Sit-Up/1.jpg"
    ]
  }
]
```
### Estrutura dos Exercícios

**Cada exercício contém os seguintes campos:**

- *id:* Identificador único do exercício.
- *name:* Nome do exercício.
- *force:* Tipo de força utilizada no movimento (ex: *pull* ou *push*).
- *level:* Nível de dificuldade (ex: *beginner, intermediate, advanced*).
- *mechanic:* Tipo de mecânica do exercício (*compound* ou *isolation*).
- *equipment:* Equipamento necessário (ex: *body only, dumbbell*).
- *primaryMuscles:* Principais músculos trabalhados.
- *secondaryMuscles:* Músculos secundários envolvidos.
- *instructions:* Lista de instruções passo a passo para executar o exercício.
- *category:* Categoria do exercício (ex: *strength, cardio*).
- *images:* Links para imagens ilustrativas do exercício.

## 3. Obter Detalhes de um Exercício Específico

**Descrição:**<br>Retorna as informações de um exercício específico a partir do id.

Método: ``GET``

**Endpoint:**

```sql
/api/exercises/:id
```

**Exemplo de Requisição:**

```sql
GET /api/exercises/1
```
**Resposta:**

```json
{
  "id": "1",
  "name": "3/4 Sit-Up",
  "force": "pull",
  "level": "beginner",
  "mechanic": "compound",
  "equipment": "body only",
  "primaryMuscles": ["abdominals"],
  "secondaryMuscles": ["obliques"],
  "instructions": [
    "Deite-se de costas com os joelhos dobrados e os pés no chão.",
    "Coloque suas mãos atrás da cabeça.",
    "Levante a parte superior do seu corpo até cerca de 45 graus e depois desça."
  ],
  "category": "strength",
  "images": [
    "/exercises/3_4_Sit-Up/0.jpg",
    "/exercises/3_4_Sit-Up/1.jpg"
  ]
}
```
### Imagens dos Exercícios

As imagens de cada exercício estão disponíveis no seu repositório local dentro da pasta *public/exercises/.*<br>
Cada exercício tem uma pasta com o nome correspondente, contendo imagens numeradas para cada etapa do movimento.

**Exemplo:**
- Caminho das imagens do exercício "3/4 Sit-Up":
> - /public/exercises/3_4_Sit-Up/0.jpg
> - /public/exercises/3_4_Sit-Up/1.jpg

## Observações
- A API é somente para leitura. Não há suporte para criação, edição ou exclusão de exercícios.
- As informações dos exercícios são provenientes da Free Exercise Database, criada por **Yuhonas**. Se utilizar este projeto, considere dar os devidos créditos ao autor original.

### Tecnologias Utilizadas
- **Node.js:** Ambiente de execução JavaScript no backend.
- **Express.js:** Framework web usado para criar e gerenciar as rotas da API.
- **MongoDB:** Banco de dados NoSQL utilizado para armazenar os dados dos exercícios.
- **Vercel:** Plataforma utilizada para hospedar a API.

### Instruções de Uso
1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/exercise-api.git
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor:

```bash
npm start
```

4. Acesse a API em:
```sql
http://localhost:3000/api/exercises.
```

### Licença
Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

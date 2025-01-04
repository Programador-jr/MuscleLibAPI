# Documentação da API MuscleLib

Este repositório contém a API de exercícios baseada no projeto original de Yuhonas, disponível [aqui](https://github.com/yuhonas/free-exercise-db). 
<br>A **API MuscleLib** fornece uma lista de exercícios de musculação, permitindo que os usuários pesquisem e filtrem os exercícios de acordo com suas necessidades.

## Endpoints

### 1. Obter todos os exercícios

**URL**: `/api/exercises`  
**Método**: `GET`

Recupera uma lista de todos os exercícios disponíveis na API.

**Exemplo de resposta**:
```json
{
  "_id": "6740c419026094d35227a20f",
  "name": "3/4 Sit-Up",
  "force": "pull",
  "level": "beginner",
  "mechanic": "compound",
  "equipment": "body only",
  "primaryMuscles": [
    "abdominals"
  ],
  "secondaryMuscles": [],
  "instructions": [
    "Lie down on the floor and secure your feet. Your legs should be bent at the knees.",
    "Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position.",
    "Flex your hips and spine to raise your torso toward your knees.",
    "At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only ¾ of the way down.",
    "Repeat for the recommended amount of repetitions."
  ],
  "category": "strength",
  "images": [
    "3_4_Sit-Up/0.jpg",
    "3_4_Sit-Up/1.jpg"
  ],
  "id": "3_4_Sit-Up",
  "__v": 0
}
```

### 2. Pesquisa de exercícios

**URL**: `/api/exercises/search?query={query}`  
**Método**: `GET`

Permite pesquisar exercícios pelo nome. A pesquisa é feita de forma eficiente utilizando a biblioteca **Fuse.js**, o que permite buscas por termos parciais.

#### 2.1. Pesquisa com sucesso (exemplo: `query=crucifix`)

**Exemplo de requisição**:
```bash
GET https://libapi.vercel.app/api/exercises/search?query=crucifix
```

**Exemplo de resposta**:
```json
{
  "message": "Exercícios encontrados:",
  "exercises": [
    {
      "_id": "6740c419026094d35227a2c8",
      "name": "Crucifix",
      "force": "static",
      "level": "beginner",
      "mechanic": "isolation",
      "equipment": "other",
      "primaryMuscles": [
        "shoulders"
      ],
      "secondaryMuscles": [
        "forearms"
      ],
      "instructions": [
        "In the crucifix, you statically hold weights out to the side for time. While the event can be practiced using dumbbells, it is best to practice with one of the various implements used, such as axes and hammers, as it feels different.",
        "Begin standing, and raise your arms out to the side holding the implements. Your arms should be parallel to the ground. In competition, judges or sensors are used to let you know when you break parallel. Hold for as long as you can. Typically, the weights should be heavy enough that you fail in 30-60 seconds."
      ],
      "category": "strongman",
      "images": [
        "Crucifix/0.jpg",
        "Crucifix/1.jpg"
      ],
      "id": "Crucifix",
      "__v": 0
    }
  ]
}
```

#### 2.2. Pesquisa sem um parâmetro de busca (exemplo: `query=`)

**Exemplo de requisição**:
```bash
GET https://libapi.vercel.app/api/exercises/search?query=
```

**Exemplo de resposta**:
```json
{
  "message": "Por favor, insira um termo de pesquisa"
}
```

#### 2.3. Pesquisa com palavra não encontrada (exemplo: `query=3/5`)

**Exemplo de requisição**:
```bash
GET https://libapi.vercel.app/api/exercises/search?query=3/5
```

**Exemplo de resposta**:
```json
{
  "message": "Exercícios encontrados:",
  "exercises": [
    {
      "_id": "6740c419026094d35227a20f",
      "name": "3/4 Sit-Up",
      "force": "pull",
      "level": "beginner",
      "mechanic": "compound",
      "equipment": "body only",
      "primaryMuscles": [
        "abdominals"
      ],
      "secondaryMuscles": [],
      "instructions": [
        "Lie down on the floor and secure your feet. Your legs should be bent at the knees.",
        "Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position.",
        "Flex your hips and spine to raise your torso toward your knees.",
        "At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only ¾ of the way down.",
        "Repeat for the recommended amount of repetitions."
      ],
      "category": "strength",
      "images": [
        "3_4_Sit-Up/0.jpg",
        "3_4_Sit-Up/1.jpg"
      ],
      "id": "3_4_Sit-Up",
      "__v": 0
    }
  ]
}
```

### 3. Exemplos de erros

#### 3.1. Nenhum exercício encontrado

**Exemplo de resposta** (quando não há resultados para a pesquisa):
```json
{
  "message": "Por favor, insira um termo de pesquisa"
}
```

#### 3.2. Parâmetro `query` ausente

**Exemplo de resposta** (quando o parâmetro `query` não for fornecido na requisição):
```json
{
  "message": "Por favor, insira um termo de pesquisa"
}
```

## Como Usar

1. **Acessar todos os exercícios**: Acesse a URL `https://libapi.vercel.app/api/exercises` para obter a lista completa de exercícios.
2. **Pesquisar um exercício**: Use a URL `https://libapi.vercel.app/api/exercises/search?query={termo}` para buscar um exercício específico, substituindo `{termo}` pela palavra-chave de sua escolha.

## Exemplo de Uso com cURL

### Buscar por exercício específico:
```bash
curl -X GET "https://libapi.vercel.app/api/exercises/search?query=agachamento"
```

### Obter todos os exercícios:
```bash
curl -X GET "https://libapi.vercel.app/api/exercises"
```
## Licença

---

Distribuído sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais informações.

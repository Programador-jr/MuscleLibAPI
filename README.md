# **MuscleLib API Documentation**

This repository contains the exercise API based on the original project by Yuhonas, available [here](https://github.com/yuhonas/free-exercise-db).  
The **MuscleLib API** provides a list of bodybuilding exercises, allowing users to search and filter exercises according to their needs, with support for multiple languages and pagination.

---
<details>
  <summary>Documentação em Português</summary>
  
## **Endpoints**

### **1. Obter todos os exercícios**

**URL**: `https://libapi.vercel.app/api/exercises`  
**Método**: `GET`

Recupera uma lista paginada de exercícios disponíveis na API.

**Parâmetros de consulta**:
- `lang` (opcional): Define o idioma dos resultados. Valores possíveis:
  - `en` (padrão)
  - `pt`
- `page` (opcional): Número da página. Valor padrão: `0`.
- `limit` (opcional): Número máximo de itens por página. Valor padrão: `50`.

**Exemplo de requisição**:  
```bash
GET https://libapi.vercel.app/api/exercises?lang=pt&page=0&limit=50
```

**Exemplo de resposta**:
```json
[
  {
    "_id": "6740c419026094d35227a20f",
    "name": "Abdominal 3/4",
    "force": "puxar",
    "level": "iniciante",
    "mechanic": "composto",
    "equipment": "somente corpo",
    "primaryMuscles": ["abdominais"],
    "secondaryMuscles": [],
    "instructions": [
      "Deite-se no chão e prenda os pés. Suas pernas devem estar dobradas nos joelhos.",
      "Coloque as mãos atrás ou ao lado da cabeça. Esta será sua posição inicial.",
      "Flexione seus quadris e coluna para levantar o torso em direção aos joelhos.",
      "No topo da contração, seu torso deve estar perpendicular ao chão. Reverta o movimento, descendo apenas ¾ do caminho.",
      "Repita pelo número recomendado de repetições."
    ],
    "category": "força",
    "images": ["3_4_Sit-Up/0.jpg", "3_4_Sit-Up/1.jpg"],
    "id": "3_4_Sit-Up"
  }
]
```

---

### **2. Pesquisa de exercícios**

**URL**: `/api/exercises/search`  
**Método**: `GET`

Permite pesquisar exercícios pelo nome, considerando o idioma.

**Parâmetros de consulta**:
- `query` (obrigatório): Termo a ser pesquisado.
- `lang` (opcional): Idioma da pesquisa. Valores possíveis:
  - `en` (padrão)
  - `pt`

**Exemplo de requisição**:  
```bash
GET https://libapi.vercel.app/api/exercises/search?lang=pt&query=crucifixo
```

#### **2.1. Pesquisa com sucesso**

**Exemplo de resposta**:
```json
{
  "message": "Exercícios encontrados:",
  "exercises": [
    {
      "_id": "6740c419026094d35227a2c8",
      "name": "Crucifixo",
      "force": "estático",
      "level": "iniciante",
      "mechanic": "isolamento",
      "equipment": "outros",
      "primaryMuscles": ["ombros"],
      "secondaryMuscles": ["antebraços"],
      "instructions": [
        "No crucifixo, segure pesos lateralmente de forma estática por um período de tempo.",
        "Comece de pé e levante os braços para o lado, segurando os pesos. Mantenha os braços paralelos ao chão."
      ],
      "category": "strongman",
      "images": ["Crucifix/0.jpg", "Crucifix/1.jpg"],
      "id": "Crucifix"
    }
  ]
}
```

#### **2.2. Pesquisa sem resultados**

**Exemplo de requisição**:  
```bash
GET https://libapi.vercel.app/api/exercises/search?query=inexistente
```

**Exemplo de resposta**:
```json
{
  "message": "Exercício não encontrado."
}
```

#### **2.3. Parâmetro `query` ausente**

**Exemplo de resposta**:  
```json
{
  "message": "Por favor, insira um termo de pesquisa"
}
```

---

## **Estrutura das Imagens**

As imagens dos exercícios estão organizadas em pastas, onde cada pasta corresponde a um exercício. Dentro de cada pasta, há duas imagens, nomeadas como `0.jpg` e `1.jpg`.  
Por exemplo:  
- Caminho para as imagens do exercício "Abdominal 3/4":  
  - `https://libapi.vercel.app/exercises/3_4_Sit-Up/0.jpg`  
  - `https://libapi.vercel.app/exercises/3_4_Sit-Up/1.jpg`

Essas imagens podem ser usadas diretamente no frontend para criar animações ou apresentar os exercícios de forma interativa.

---

## **Como Usar**

1. **Listar exercícios paginados**:  
   ```bash
   GET https://libapi.vercel.app/api/exercises?lang=pt&page=0&limit=50
   ```

2. **Pesquisar um exercício específico**:  
   ```bash
   GET https://libapi.vercel.app/api/exercises/search?lang=pt&query=crucifixo
   ```

3. **Exibir imagens de um exercício**:  
   Use os caminhos disponíveis no campo `images` para acessar as imagens diretamente, como:  
   ```bash
   https://libapi.vercel.app/exercises/3_4_Sit-Up/0.jpg
   ```
---
## **Licença**
Distribuído sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais informações.

</details>

## **Endpoints**

### **1. Get All Exercises**

**URL**: `https://libapi.vercel.app/api/exercises`  
**Method**: `GET`

Retrieves a paginated list of exercises available in the API.

**Query Parameters**:
- `lang` (optional): Defines the language of the results. Possible values:
  - `en` (default)
  - `pt`
- `page` (optional): Page number. Default value: `0`.
- `limit` (optional): Maximum number of items per page. Default value: `50`.

**Example Request**:  
```bash
GET https://libapi.vercel.app/api/exercises?lang=en&page=0&limit=50
```

**Example Response**:
```json
[
  {
    "_id": "6740c419026094d35227a20f",
    "name": "3/4 Sit-Up",
    "force": "pull",
    "level": "beginner",
    "mechanic": "compound",
    "equipment": "body only",
    "primaryMuscles": ["abdominals"],
    "secondaryMuscles": [],
    "instructions": [
      "Lie down on the floor and secure your feet. Your legs should be bent at the knees.",
      "Place your hands behind or to the side of your head. This will be your starting position.",
      "Flex your hips and spine to raise your torso toward your knees.",
      "At the top of the contraction, your torso should be perpendicular to the ground. Reverse the motion, going only ¾ of the way down.",
      "Repeat for the recommended number of repetitions."
    ],
    "category": "strength",
    "images": ["3_4_Sit-Up/0.jpg", "3_4_Sit-Up/1.jpg"],
    "id": "3_4_Sit-Up"
  }
]
```

---

### **2. Search Exercises**

**URL**: `/api/exercises/search`  
**Method**: `GET`

Allows searching for exercises by name, with language support.

**Query Parameters**:
- `query` (required): Term to search for.
- `lang` (optional): Search language. Possible values:
  - `en` (default)
  - `pt`

**Example Request**:  
```bash
GET https://libapi.vercel.app/api/exercises/search?lang=en&query=crucifix
```

#### **2.1. Successful Search**

**Example Response**:
```json
{
  "message": "Exercises found:",
  "exercises": [
    {
      "_id": "6740c419026094d35227a2c8",
      "name": "Crucifix",
      "force": "static",
      "level": "beginner",
      "mechanic": "isolation",
      "equipment": "other",
      "primaryMuscles": ["shoulders"],
      "secondaryMuscles": ["forearms"],
      "instructions": [
        "In the crucifix, hold weights statically to the side for a period of time.",
        "Start standing, and raise your arms to the side, holding the weights. Keep your arms parallel to the ground."
      ],
      "category": "strongman",
      "images": ["Crucifix/0.jpg", "Crucifix/1.jpg"],
      "id": "Crucifix"
    }
  ]
}
```

#### **2.2. Search with No Results**

**Example Request**:  
```bash
GET https://libapi.vercel.app/api/exercises/search?query=nonexistent
```

**Example Response**:
```json
{
  "message": "Exercise not found."
}
```

#### **2.3. Missing `query` Parameter**

**Example Response**:  
```json
{
  "message": "Please provide a search term"
}
```

---

## **Image Structure**

Exercise images are organized in folders, where each folder corresponds to an exercise. Inside each folder, there are two images named `0.jpg` and `1.jpg`.  
For example:  
- Image paths for the exercise "3/4 Sit-Up":  
  - `https://libapi.vercel.app/exercises/3_4_Sit-Up/0.jpg`  
  - `https://libapi.vercel.app/exercises/3_4_Sit-Up/1.jpg`

These images can be used directly in a frontend to create animations or display the exercises interactively.

---

## **How to Use**

1. **List paginated exercises**:  
   ```bash
   GET https://libapi.vercel.app/api/exercises?lang=en&page=0&limit=50
   ```

2. **Search for a specific exercise**:  
   ```bash
   GET https://libapi.vercel.app/api/exercises/search?lang=en&query=crucifix
   ```

3. **Display exercise images**:  
   Use the paths provided in the `images` field to access the images directly, such as:  
   ```bash
   https://libapi.vercel.app/exercises/3_4_Sit-Up/0.jpg
   ```

## **License**

Distributed under the MIT License. See the [LICENSE](LICENSE) file for more information.
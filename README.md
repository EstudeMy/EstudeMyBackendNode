# 📚 EstudeMy Backend

Backend do projeto **EstudeMy**, desenvolvido em **Node.js + Express + MongoDB**, com autenticação via **JWT** e senhas criptografadas com **bcrypt**.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Mongoose](https://mongoosejs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken (JWT)](https://www.npmjs.com/package/jsonwebtoken)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [nodemon](https://www.npmjs.com/package/nodemon) (desenvolvimento)

---

## 📁 Estrutura de Pastas



estudemy-backend/
├── src/
│ ├── config/
│ │ └── db.js
│ │
│ ├── controllers/
│ │ └── userController.js
│ │
│ ├── middlewares/
│ │ └── authMiddleware.js
│ │
│ ├── models/
│ │ └── userModel.js
│ │
│ ├── routes/
│ │ └── userRoutes.js
│ │
│ ├── services/
│ │ └── userService.js
│ │
│ ├── utils/
│ │ └── tokenHelper.js
│ │
│ ├── app.js
│ └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md



---

## ⚙️ Instalação e Configuração

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/seu-usuario/estudemy-backend.git
cd estudemy-backend
````
2️⃣ Instalar dependências
npm install
npm install express cors dotenv mongoose bcrypt jsonwebtoken
npm install --save-dev nodemon

Instalação de Tudo de Uma Vez
npm install express cors dotenv mongoose bcrypt jsonwebtoken && npm install --save-dev nodemon



4️⃣ Rodar o servidor
npm run dev

Servidor rodando em: http://localhost:3000

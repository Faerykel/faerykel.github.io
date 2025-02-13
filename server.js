const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();  // Para carregar as variáveis de ambiente do .env

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));  // Para servir os arquivos estáticos do frontend

// Configuração do transporte de e-mail com nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Ou o serviço de e-mail que você estiver usando
    auth: {
        user: process.env.EMAIL_USER, // Usando variável de ambiente
        pass: process.env.EMAIL_PASS  // Usando variável de ambiente
    }
});

// Rota para o envio de e-mail
app.post('/enviar-email', (req, res) => {
    const { nome, email, mensagem } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER, // Usando variável de ambiente
        to: 'raquel.rlima97@gmail.com', // Para onde vai o e-mail
        subject: `Mensagem de ${nome} - ${email}`,
        text: mensagem
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Erro ao enviar o e-mail');
        }
        res.status(200).send('E-mail enviado com sucesso');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

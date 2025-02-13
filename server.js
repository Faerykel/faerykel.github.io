const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

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
        user: 'seu-email@gmail.com', // Coloque seu e-mail
        pass: 'sua-senha-ou-app-password' // Coloque a senha ou senha do aplicativo
    }
});

// Rota para o envio de e-mail
app.post('/enviar-email', (req, res) => {
    const { nome, email, mensagem } = req.body;

    const mailOptions = {
        from: 'seu-email@gmail.com', // Seu e-mail
        to: 'email-destino@example.com', // Para onde vai o e-mail
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

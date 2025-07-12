const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// 🔐 Your email credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'racehremail@gmail.com',           // your Gmail
    pass: 'bsujbxtfowrqdogd'                 // your 16-char app password
  }
});

app.get('/', (req, res) => {
  res.send('Hello, the server is working!');
});

// 📮 POST endpoint
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const mailOptions = {
    from: 'racehremail@gmail.com',
    to: 'pradeep.a@specularbusiness.com', // send to self or any receiver
    subject: 'New Contact Form Message',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Email sending failed:', error);
      return res.status(500).json({ message: 'Email sending failed.' });
    } else {
      console.log('✅ Email sent:', info.response);
      return res.json({ message: 'Message sent successfully!' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`📡 Backend running at http://localhost:${PORT}`);
});

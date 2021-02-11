const express = require('express');
const router = express.Router();
const {
  createToken,
  checkToken,
  hashPassword,
  transporterPromisify,
  transporter,
} = require('../favordb');
const { query } = require('../db');

const handleToken = (data) => {
  const newData = { ...data };
  const token = createToken(newData);
  newData.token = token;
  return newData;
};

router.get('/', async (req, res) => {
  try {
    const getData = await query(`SELECT * FROM userdb`);
    return res.status(200).send(getData);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.post('/login', async (req, res) => {
  const { username_email, password } = req.body;
  const regexEmail = /[\w\-\.]+(@[\w\-]+\.)+[\w\-\.]{2,4}$/;
  let sql_query;
  if (username_email.match(regexEmail)) {
    sql_query = `SELECT * FROM userdb WHERE email = '${username_email}' AND password = '${hashPassword(
      password
    )}'`;
  } else {
    sql_query = `SELECT * FROM userdb WHERE username = '${username_email}' AND password = '${hashPassword(
      password
    )}'`;
  }
  try {
    const data = await query(sql_query);
    const newData = await handleToken(data[0]);
    return res.status(200).send(newData);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.post('/keep-login', checkToken, async (req, res) => {
  try {
    const data = await query(`SELECT * FROM userdb WHERE id = ${req.user.id}`);
    return res.status(200).send(data[0]);
  } catch (err) {
    console.log(err);
    if (err) return res.status(500).send(err);
  }
});

router.post('/register-live-validation', async (req, res) => {
  const { username, email } = req.body;
  const usernameExist = await query(`SELECT username FROM userdb WHERE username = '${username}'`);
  const emailExist = await query(`SELECT email FROM userdb WHERE email = '${email}'`);
  return res.status(200).send({ username: usernameExist[0], email: emailExist[0] });
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await query(
      `INSERT INTO userdb (username, email, password, roleID, verified) VALUES ('${username}', '${email}', '${hashPassword(
        password
      )}', 2, 0)`
    );
    const data = await query(`SELECT * FROM userdb WHERE email = '${email}'`);
    const newData = await handleToken(data[0]);
    return res.status(200).send(newData);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await query(`DELETE FROM userdb WHERE id = ${id}`);
    return res.status(200).send({ status: 'success', message: 'delete from userdb' });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.post('/send-change-password', async (req, res) => {
  const { user } = req.body;
  let sql_getUser;
  try {
    const regexEmail = /[\w\-\.]+(@[\w\-]+\.)+[\w\-\.]{2,4}$/;
    if (user.match(regexEmail)) {
      sql_getUser = `SELECT * FROM userdb WHERE email = '${user}'`;
    } else {
      sql_getUser = `SELECT * FROM userdb WHERE username = '${user}'`;
    }
    const getUser = await query(sql_getUser);
    const new_getUser = handleToken(getUser[0]);
    const { email, username, token } = new_getUser;
    const mailOptions = {
      from: `<admin> no-reply@admin.com`,
      to: email,
      subject: `Password Reset Confirmation`,
      template: 'forgot_password',
      context: {
        username,
        token,
      },
    };
    await transporterPromisify(mailOptions);
    return res.status(200).send({ status: 'ok', message: `sent`, user: new_getUser });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.post('/change-password', checkToken, async (req, res) => {
  const userID = parseInt(req.user.userID);
  const { password } = req.body;
  try {
    await query(
      `UPDATE userdb SET password = '${hashPassword(password)}' WHERE userID = ${userID}`
    );
    return res.status(200).send({ status: 'success', message: `change password` });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = router;

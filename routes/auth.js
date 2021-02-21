const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
 
const respond = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader('Access-Control-Allow-Methods', ['POST', 'PUT', 'DELETE']);
    return res.send("hi");
}

router.options('/register', (req, res) => {
    respond(res);
});

router.options('/login', (req, res) => {
    respond(res);
});

/**
 * @route          /auth/register
 * @description    register a new user
 */
router.post('/register', async(req, res) => {
    const details = req.body;
    let r = await sql.query(`
        SELECT * 
        FROM auth 
        WHERE email = ?`,
        [details.email]);
    if(r.length > 0) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.status(400).json({ msg: "A user already exists with the specified email ID!" });
    } 
    const salt = await bcrypt.genSalt(10);
    const encrypted_password = await bcrypt.hash(details.password, salt);
    let r2 = await sql.query(`
        INSERT INTO auth (id, user, email, password) 
        VALUES (?, ?, ?, ?)`,
        [null, details.name, details.email, encrypted_password]);
    if (r2.affectedRows) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        let mail = Buffer.from(details.email).toString('base64');
        return res.send(mail);
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(false);
});
    

/**
 * @route          /auth/login
 * @description    authorize user and return validation result
 */
router.post('/login', async(req, res) => {
    const data = req.body;
    let r = await sql.query(`
        SELECT password 
        FROM auth 
        WHERE email = ?`,
        [data.email]);
    if (await bcrypt.compare(data.password, r[0].password)) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        let mail = Buffer.from(data.email).toString('base64');
        return res.send(mail);
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(false);
});

module.exports = router;
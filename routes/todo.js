const express = require('express');
const router = express.Router();

const respond = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader('Access-Control-Allow-Methods', ['POST', 'PUT', 'DELETE']);
    return res.send("hi");
}

router.options('/', (req, res) => {
    respond(res);
});

router.options('/:id', (req, res) => {
    respond(res);
});

router.options('/:id/:user', (req, res) => {
    respond(res);
});

/**
 * @route          /todo/:id
 * @description    return the to-do list of the user
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const email = Buffer.from(id, 'base64').toString();
    let r = await sql.query(`
        SELECT * 
        FROM todo 
        WHERE email = ?`,
        [email]);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(r);
});


/**
 * @route          /todo
 * @description    add an item to the list of a user
 */
router.post('/', async (req, res) => {
    const data = req.body;
    let r = await sql.query(`
        INSERT INTO todo (id, name, description, email) 
        VALUES(?, ?, ?, ?)`,
        [null, data.name, data.description, data.email]);
    if (r.affectedRows) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        let r2 = await sql.query(`
            SELECT * 
            FROM todo 
            WHERE name = ? AND description = ? AND email = ?`,
            [data.name, data.description, data.email])
        return res.send(r2[0]);
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.send(false);
});


/**
 * @route          /todo
 * @description    edit an item in the list of a user
 */
router.put('/', async (req, res) => {
    const data = req.body;
    let r = await sql.query(`
        UPDATE todo 
        SET name = ?, description = ?
        WHERE email = ? AND id = ?`,
        [data.name, data.description, data.email, data.id]);
    if (r.affectedRows) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.send(true);
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.send(false);
});
   

/**
 * @route          /todo/:id/:user
 * @description    delete an item from the list of the user
 */
router.delete('/:id/:user', async (req, res) => {
    const { id, user } = req.params;
    let r = await sql.query(`
        DELETE 
        FROM todo 
        WHERE id = ? AND email = ?`,
        [id, user]);
    if (r.affectedRows) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.send(true);
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.send(false);
});

module.exports = router;
const { Contact, Company } = require('../models/sequelize');

async function getAll(req, res) {
  try {
    const where = {};
    if (req.query.companyId) {
      where.companyId = req.query.companyId;
    }

    const contacts = await Contact.findAll({ where });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getById(req, res) {
  try {
    const contact = await Contact.findByPk(req.params.id, {
      include: [{ model: Company, as: 'company' }]
    });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function create(req, res) {
  try {
    const { firstName, lastName, email, phone, companyId } = req.body;
    const contact = await Contact.create({ firstName, lastName, email, phone, companyId });
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    await contact.update(req.body);

    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function remove(req, res) {
  try {
    const deleted = await Contact.destroy({ where: { id: req.params.id } });

    if (deleted === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
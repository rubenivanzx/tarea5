const Activity = require('../models/mongoose/activity');

async function getAll(req, res) {
  try {
    const filter = {};
    if (req.query.type) {
      filter.type = req.query.type;
    }

    const activities = await Activity.find(filter);
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getById(req, res) {
  const activity = await Activity.findById(req.params.id);

  if (!activity) {
    return res.status(404).json({ error: 'Activity not found' });
  }

  res.status(200).json(activity);
}

async function create(req, res) {
  try {
    const { type, description, contactId, userId, metadata } = req.body;
    const activity = await Activity.create({ type, description, contactId, userId, metadata });

    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.status(200).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function remove(req, res) {
  const activity = await Activity.findByIdAndDelete(req.params.id);

  if (!activity) {
    return res.status(404).json({ error: 'Activity not found' });
  }

  res.status(204).send();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};

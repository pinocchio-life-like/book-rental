const User = require("../models/user");
const { ForbiddenError } = require("@casl/ability");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (req.ability.can("read", user)) {
      res.json(user);
    } else {
      throw new ForbiddenError("Not allowed");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUser };

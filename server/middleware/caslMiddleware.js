const { AbilityBuilder, Ability } = require("@casl/ability");

const defineAbilitiesFor = (user) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  switch (user.role) {
    case "admin":
      can("manage", "all");
      break;
    case "owner":
      can(["read", "create", "update", "delete"], "Book", { ownerId: user.id });
      break;
    default:
      can("read", "Book");
  }

  return build();
};

const caslMiddleware = (req, res, next) => {
  req.ability = defineAbilitiesFor(req.user);
  next();
};

module.exports = { caslMiddleware };

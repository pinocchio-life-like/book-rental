import { AbilityBuilder, Ability } from "@casl/ability";

export function defineAbilitiesFor(user) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  // Admin permissions
  if (user.role === "admin") {
    can("approve", "Owner");
    can("approve", "Book");
    can("disable", "Owner");
    can("filter", "Book");
    can("manages", "Book", { ownerId: user.id });
    can("manages", "Owners", { ownerId: user.id });
    can("read", "Book", { ownerId: user.id });
  }
  // Book owner permissions
  else if (user.role === "owner") {
    can("read", "Book", { ownerId: user.id });
    can("create", "Book");
    can("update", "Book", { ownerId: user.id });
    can("delete", "Book", { ownerId: user.id });
    cannot("delete", "Book", { isApproved: true });
    can("see", "Revenue");
    can("upload", "Book");
  } else {
    can("read", "Book", { isApproved: true });
  }

  return build();
}

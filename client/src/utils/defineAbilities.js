import { AbilityBuilder, Ability } from "@casl/ability";

export function defineAbilitiesFor(user) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.role === "admin") {
    can("manage", "all"); // Admin can manage everything
  } else if (user.role === "book_owner") {
    can("read", "Book");
    can("create", "Book");
    can("update", "Book", { ownerId: user.id });
    can("delete", "Book", { ownerId: user.id });
    cannot("delete", "Book", { isApproved: true });
  } else {
    can("read", "Book"); // Regular users can only read books
  }

  return build();
}

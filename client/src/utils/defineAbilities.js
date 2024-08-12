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
  }
  // Book owner permissions
  else if (user.role === "owner") {
    can("read", "Book", { ownerId: user.id }); // Owners can read only their own books
    can("create", "Book"); // Owners can create new books
    can("update", "Book", { ownerId: user.id }); // Owners can update only their own books
    can("delete", "Book", { ownerId: user.id }); // Owners can delete only their own books
    cannot("delete", "Book", { isApproved: true }); // Cannot delete approved books
    can("see", "Revenue"); // Owners can see their own revenue
    can("upload", "Book"); // Owners can see their own revenue
  }
  // Renter or general user permissions
  else {
    can("read", "Book", { isApproved: true }); // General users can only read approved books
  }

  return build();
}

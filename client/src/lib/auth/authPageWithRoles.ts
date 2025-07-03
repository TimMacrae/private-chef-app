import { ZodSchema } from "zod";
import { auth0 } from "./auth0";
import { redirect } from "next/navigation";

export async function protectPageWithRoles<T>(
  queryFn: () => Promise<T>,
  schema: ZodSchema<T>,
  allowedRoles: string[],
  options?: { redirectTo?: string }
): Promise<T> {
  const session = await auth0.getSession();

  if (!session) {
    redirect(options?.redirectTo || "/api/auth/login");
  }

  const userRoles = session.user?.roles ?? [];

  const hasAccess = allowedRoles.some((role) => userRoles.includes(role));
  if (!hasAccess) {
    redirect("/unauthorized"); // custom unauthorized page
  }

  const data = await queryFn();
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    console.error("Validation failed", parsed.error);
    throw new Error("Invalid server response");
  }

  return parsed.data;
}

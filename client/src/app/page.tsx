import { Button } from "@/components/ui/button";
import { auth0 } from "@/lib/auth/auth0";

export default async function Home() {
  const session = await auth0.getSession();
  if (session) {
    // If the user is already logged in, redirect to the dashboard or home page
    // return {
    //   redirect: {
    //     destination: "/dashboard",
    //     permanent: false,
    //   },
    // };
    return <div>PAGE</div>;
  }
  if (!session) {
    return (
      <main>
        <h1>Welcome to the Login Test Page</h1>
        <a href="/auth/login?screen_hint=signup">Sign up</a>
        <a href="/auth/login">Log in</a>
      </main>
    );
  }

  return (
    <main>
      {/* <h1>Welcome, {session.user.name}!</h1> */}
      <Button>Hi </Button>
    </main>
  );
}

import AuthLogin from "@/components/auth/auth.login";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
export default async function SignInPage() {
    const session = await getServerSession(authOptions);
    console.log("Check session", session);
    if (session?.user) {
        redirect("/");
    }
    return <AuthLogin />;
}

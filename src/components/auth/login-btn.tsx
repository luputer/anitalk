import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "../ui/button"

export default function LoginBtn() {

    const { data: session } = useSession();

    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <Button onClick={() => signOut()}>Logout</Button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )

}

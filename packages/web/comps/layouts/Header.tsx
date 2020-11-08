import Link from "next/link";
import Logo from "@/comps/Logo";

const Header = () => {
    return <div>
        <div>
            <Logo />
        </div>
        <nav>
            <Link href="/home">우리 집</Link>
            <Link href="/devices">내 장치</Link>
            <Link href="/cat">고먐미</Link>
        </nav>
        <div>
            <Link href="/users/sign-in">로그인</Link>
            <Link href="/users/new">회원가입</Link>
        </div>
    </div>
}

export default Header;
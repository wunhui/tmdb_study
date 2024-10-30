import Link from "next/link";
const Header = ({children}) => {
    return (
        <header className="l_header">
            <div className="wrap">
                <div className="left">
                    <div className="logo">
                        <Link href="/">
                            Wung's videos
                        </Link>
                    </div>
                    <nav className="gnb">
                        <ul>
                            <li><Link href="/movies">영화</Link></li>
                            <li><Link href="/series">TV</Link></li>
                            <li><Link href="/tv">인물</Link></li>
                        </ul>
                    </nav>    
                </div>
                <div className="right">
                    {/* 
                    방법 있을 시 추가 예정
                    <div className="login_wrap">
                        <Link href="/login">
                            <button>로그인</button>
                        </Link>
                        <Link href="/signup">
                            <button>회원가입</button>
                        </Link>
                    </div> */}
                    {children}
                </div>
            </div>
        </header>
    )
}

export default Header;
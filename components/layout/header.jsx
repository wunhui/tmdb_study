import Link from "next/link";
const Header = (children) => {
    return (
        <header className="l_header">
            <div className="wrap">
                <div className="logo">
                    <Link href="/">
                        <a>
                            Wung's videos
                        </a>
                    </Link>
                </div>
                <nav className="gnb">
                    <ul>
                        <li><Link href="/movies">영화</Link></li>
                        <li><Link href="/tv">TV 시리즈</Link></li>
                        <li><Link href="/tv">TV 시즌</Link></li>
                        <li><Link href="/tv">TV 에피소드</Link></li>
                    </ul>
                </nav>
                
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
        </header>
    )
}

export default Header;
import { Container } from "@/components/container";
import styles from './header.module.scss';
import Image from "next/image";
import Link from "next/link";
import {ROUTES} from "@/routes/routes";
import { useAuthContext } from "@/context/authContext";
import {UsernameWithAvatar} from "@/components/avatar/usernameWithAvatar";

export const Header = () => {
	const { isAuth, logout, userData } = useAuthContext()

	const onHandleLogout = () => logout()


	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.headerWrapper}>
					<Link href={ROUTES.home} className={styles.logo}>
						<Image src={'/logo.png'} width={50} height={50} alt={'WebTime Logo'} />
						WebTime
					</Link>

					<ul className={styles.menu}>
						<li>
							<Link href={ROUTES.settings} className={styles.logoLong}>
								Settings
							</Link>
						</li>
					</ul>

					<div>
						{isAuth ? (
							<div className={styles.avatarWrapper}>
								<UsernameWithAvatar userItem={userData ?? undefined} />
								/
								<button className={styles.login} onClick={onHandleLogout} aria-label="Logout">
									Logout
								</button>
							</div>

						) : (
							<>
								<Link href={ROUTES.auth.login} className={styles.login}>
									Login
								</Link>
								/
								<Link href={ROUTES.auth.registration} className={styles.login}>
									Registration
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</header>
	)
}

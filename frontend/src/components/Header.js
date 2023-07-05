import logo from '../images/header-logo.svg';
import { Link, useLocation } from 'react-router-dom'

const routeConfig = {
	'/': {
		linkText: 'Выйти',
		route: '/sign-in'
	},
	'/sign-up': {
		linkText: 'Войти',
		route: '/sign-in'
	},
	'/sign-in': {
		linkText: 'Регистрация',
		route: '/sign-up'
	}
};

function Header({ email, signOut }) {

	const location = useLocation()
	const isMainPage = location.pathname === '/';

	return (
		<header className='header'>
			<img className='header__logo' src={logo} alt='Логотип Место' />
			<div className='header__nav'>
				{isMainPage && email}
				{routeConfig[location.pathname] &&
				<Link
					className='header__link'
					onClick={isMainPage && signOut}
					to={routeConfig[location.pathname].route}
				>
					{routeConfig[location.pathname].linkText}
				</Link>}
			</div>

		</header>
	);
};

export default Header
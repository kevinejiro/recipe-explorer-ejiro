import { useDispatch } from 'react-redux';
import Logo from '../../assets/svg/logo/Logo';
import Button from '../common/button/Button';
import styles from './nav.module.css';
import { uiActions } from '../../store/ui/uiSlice';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const { toggleAddRecipeModal } = uiActions;

	function handleAddRecipe() {
		dispatch(toggleAddRecipeModal());
	}
	return (
		<section className={styles.navWrapper}>
			<header>
				<Button
					onClick={() => navigate('/')}
					aria-label='Return to homepage'
					title='Return to homepage'
					className={styles.logoWrapper}
					variant='text'
				>
					<Logo />
				</Button>
				<nav>
					<ul className={styles.buttons}>
						<li>
							<Button onClick={handleAddRecipe} variant='primary'>
								Add a recipe
							</Button>
						</li>
					</ul>
					<div className={styles.buttonsMobile}>
						<Button onClick={handleAddRecipe}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='32'
								height='32'
								fill='none'
								viewBox='0 0 32 32'
							>
								<path
									stroke='#EEA757'
									strokeLinecap='square'
									strokeMiterlimit='10'
									strokeWidth='2'
									d='M16 3v26M3 16h26'
								></path>
							</svg>
						</Button>
					</div>
				</nav>
			</header>
		</section>
	);
}

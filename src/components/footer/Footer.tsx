import styles from './footer.module.css';

export default function Footer(): JSX.Element {
	return (
		<section className={styles.footerWrapper}>
			<footer className={styles.footer}>
				<p>&copy; {new Date().getFullYear()} Recipe Explorer. All rights reserved</p>
			</footer>
		</section>
	);
}

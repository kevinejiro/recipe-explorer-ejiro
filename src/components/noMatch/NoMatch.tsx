import styles from './noMatch.module.css';
export default function NoMatch({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<section className={styles.noMatch}>
				<article className={styles.noMatchMessage}>{children}</article>
			</section>
		</main>
	);
}

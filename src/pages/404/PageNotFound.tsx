import Button from '../../components/common/button/Button';
import NoMatch from '../../components/noMatch/NoMatch';

export default function PageNotFound() {
	return (
		<NoMatch>
			<h1>404: Page not found</h1>
			<p>The page you are looking for cannot be found.</p>
			<a href='/'>
				<Button variant='primary'>Return To Homepage</Button>
			</a>
		</NoMatch>
	);
}

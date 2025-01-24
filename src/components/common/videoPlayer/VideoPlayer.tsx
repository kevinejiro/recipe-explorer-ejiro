import styles from './videoPlayer.module.css';
import useInView from '../../../hooks/useInView';

const VideoPlayer: React.FC<{
	videoUrl: string;
	posterUrl?: string;
	altText: string;
}> = ({ videoUrl, posterUrl = '', altText = '' }) => {
	const { ref, isInView } = useInView({ threshold: 0.1 }) as {
		ref: React.RefObject<HTMLVideoElement>;
		isInView: boolean;
	};

	if (!videoUrl) {
		return <p>Video URL is not available.</p>;
	}

	const isYouTube =
		videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');

	return (
		<article className={styles.videoContainer} aria-label={altText}>
			{isYouTube ? (
				<iframe
					data-testid='videoPlayer'
					src={`https://www.youtube.com/embed/${new URL(
						videoUrl
					).searchParams.get('v')}`}
					frameBorder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
					className={styles.videoFrame}
					aria-describedby='video-description'
					title={altText}
				/>
			) : (
				<video
					data-testid='videoPlayer'
					ref={ref}
					autoPlay
					muted
					controls
					className={styles.videoFrame}
					aria-describedby='video-description'
					poster={posterUrl}
				>
					{isInView && <source src={videoUrl} type='video/mp4' />}
					<p id='video-description'>{altText}</p>
					Your browser does not support the video tag.
				</video>
			)}
		</article>
	);
};

export default VideoPlayer;

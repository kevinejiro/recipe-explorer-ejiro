import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({
	children,
	open,
	className = '',
	handleClose,
}: {
	children: React.ReactNode;
	open: boolean;
	className?: string;
	handleClose?: () => void;
}) {
	const dialog = useRef<HTMLDialogElement>(null);
	const cssClassNames = `modal ${className}`;

	useEffect(() => {
		const modal = dialog.current;
		if (open && modal) {
			modal.showModal();
		}

		return () => {
			if (modal && open) {
				modal.close();
			}
		};
	}, [open]);
	return createPortal(
		<dialog ref={dialog} className={cssClassNames} onClose={handleClose}>
			{children}
		</dialog>,
		document.getElementById('modal') || document.body
	);
}

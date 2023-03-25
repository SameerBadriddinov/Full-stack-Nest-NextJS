import { Navbar } from 'src/components';
import { LayoutProps } from './layout.props';

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Navbar />
			<div className='container'>{children}</div>
		</>
	);
};

export default Layout;

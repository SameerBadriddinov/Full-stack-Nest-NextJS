import type { GetServerSideProps, NextPage } from 'next';
import { BlogCard } from 'src/components';
import { BlogType } from 'src/interfaces/blog.interface';
import Layout from 'src/layout';
import { BlogService } from 'src/services/blog.service';

const Home: NextPage<HomePageProps> = ({ blogs }) => {
	return (
		<Layout>
			<div className='album py-5 '>
				<div className='container'>
					<div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
						{blogs.map(item => (
							<BlogCard item={item} key={item._id} />
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
	const blogs = await BlogService.getAllBlogs();

	return {
		props: { blogs },
	};
};

interface HomePageProps {
	blogs: BlogType[];
}

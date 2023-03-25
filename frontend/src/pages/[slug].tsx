import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { BlogType } from 'src/interfaces/blog.interface';
import Layout from 'src/layout';
import { BlogService } from 'src/services/blog.service';

const DetailedBlog: NextPage<DetailedBlogPageProps> = ({ blog }) => {
	const router = useRouter();

	return (
		<Layout>
			<div className='container'>
				<button onClick={() => router.push('/')} className='btn btn-outline-primary mt-5'>
					Back
				</button>
				<h1 className='mt-2'>{blog.title}</h1>
				<h5 className='mt-4'>{blog.excerpt}</h5>
				<p className='mt-2'>{blog.description}</p>
			</div>
		</Layout>
	);
};

export default DetailedBlog;

export const getServerSideProps: GetServerSideProps<DetailedBlogPageProps> = async ({ query }) => {
	const blog = await BlogService.getBlogBySlug(query.slug as string);

	return {
		props: { blog },
	};
};

interface DetailedBlogPageProps {
	blog: BlogType;
}

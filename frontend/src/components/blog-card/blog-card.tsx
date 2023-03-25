import { useRouter } from 'next/router';
import { BlogService } from 'src/services/blog.service';
import { calculateEstimatedTimeToRead } from 'src/utils/time';
import { BlogCardProps } from './blog-card.props';

const BlogCard = ({ item }: BlogCardProps) => {
	const router = useRouter();

	const onDeleteHandler = async () => {
		try {
			const statusReponse = await BlogService.deleteBlog(item._id);
			if (statusReponse === 200) {
				router.replace(router.asPath);
			}
		} catch (error) {
			const result = error as Error;
			console.log(result.message);
		}
	};

	return (
		<div className='col' key={item._id}>
			<div className='card shadow-sm'>
				<div className='card-body'>
					<h5 className='card-title'>{item.title}</h5>
					<p className='card-text'>{item.excerpt}</p>
					<div className='d-flex justify-content-between align-items-center'>
						<div className='btn-group'>
							<button
								onClick={() => router.push(`/${item.slug}`)}
								type='button'
								className='btn btn-sm btn-outline-secondary'
							>
								View
							</button>
							<button
								type='button'
								onClick={() => router.push(`/edit/${item.slug}`)}
								className='btn btn-sm btn-outline-secondary'
							>
								Edit
							</button>
							<button
								onClick={onDeleteHandler}
								type='button'
								className='btn btn-sm btn-outline-secondary'
							>
								Delete
							</button>
						</div>
						<small className='text-body-secondary'>
							{calculateEstimatedTimeToRead(item.description)} mins
						</small>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;

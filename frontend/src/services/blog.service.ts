import axios from 'axios';
import { FormValue } from 'src/components/form/form.props';
import { BlogType } from 'src/interfaces/blog.interface';

export const BlogService = {
	async getAllBlogs() {
		const { data } = await axios.get<BlogType[]>(`${process.env.NEXT_PUBLIC_DOMAIN_API}/blog`);
		return data;
	},
	async getBlogBySlug(slug: string) {
		const { data } = await axios.get<BlogType>(
			`${process.env.NEXT_PUBLIC_DOMAIN_API}/blog/${slug}`
		);
		return data;
	},
	async deleteBlog(id: string) {
		const { status } = await axios.delete<number>(
			`${process.env.NEXT_PUBLIC_DOMAIN_API}/blog/${id}`,
			{
				data: { id },
			}
		);
		return status;
	},
	async createBlog(dataForm: FormValue) {
		const { data } = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_API}/blog`, dataForm);
		return data;
	},
	async editBlog(dataForm: FormValue, id: string) {
		const { data } = await axios.patch(
			`${process.env.NEXT_PUBLIC_DOMAIN_API}/blog/${id}`,
			dataForm
		);
		return data;
	},
};

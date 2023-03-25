import Form from 'src/components/form/form';
import { FormValue } from 'src/components/form/form.props';
import Layout from 'src/layout';
import { BlogService } from 'src/services/blog.service';

const CreateBlog = () => {
	const onSubmit = async (formData: FormValue) => {
		const data = await BlogService.createBlog(formData);
		return data;
	};

	return (
		<Layout>
			<Form onSubmit={onSubmit} sectionTitle={'Create blog'} />
		</Layout>
	);
};

export default CreateBlog;

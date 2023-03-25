import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ErrorType, FormProps, FormValue } from './form.props';

const Form = ({ onSubmit, sectionTitle, values }: FormProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string[]>([]);
	const [formValue, setformValue] = useState<FormValue>({
		title: '',
		description: '',
		excerpt: '',
	});

	const router = useRouter();

	const onChange = (name: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setformValue({ ...formValue, [name]: e.target.value });
	};

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			await onSubmit(formValue);
			router.push('/');
		} catch (error) {
			const result = error as ErrorType;
			setLoading(false);
			if (result.response.data.message) {
				setError(result.response.data.message);
			} else {
				setError([result.message]);
			}
		}
	};

	const removeErrorItem = (item: string) => {
		setError(error.filter(err => err !== item));
	};

	useEffect(() => {
		setformValue({
			title: values?.title,
			excerpt: values?.excerpt,
			description: values?.description,
		});

		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<h4 className='text-center'>{sectionTitle}</h4>
			<main className='form-signin w-50 text-black m-auto'>
				{error.length &&
					error.map(item => (
						<div
							key={item}
							className='alert alert-warning alert-dismissible fade show'
							role='alert'
						>
							<div>{item}</div>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='alert'
								aria-label='Close'
								onClick={() => removeErrorItem(item)}
							/>
						</div>
					))}
				<form onSubmit={submitHandler}>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							name=''
							id='floatingInput'
							placeholder='Title'
							value={formValue.title}
							onChange={onChange('title')}
						/>
						<label htmlFor='floatingInput'>Title</label>
					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingInput'
							placeholder='Excerpt'
							value={formValue.excerpt}
							onChange={onChange('excerpt')}
						/>
						<label htmlFor='floatingInput'>Excerpt</label>
					</div>
					<div className='form-floating'>
						<textarea
							className='form-control'
							placeholder='Leave a comment here'
							id='floatingTextarea2'
							style={{ height: '200px' }}
							value={formValue.description}
							onChange={onChange('description')}
						></textarea>
						<label htmlFor='floatingTextarea2'>Description</label>
					</div>

					<button disabled={loading} className='w-100 btn btn-lg btn-primary' type='submit'>
						{loading ? 'Loading...' : 'Submit'}
					</button>
					<p className='mt-5 mb-3 text-body-secondary'>© 2017–2023</p>
				</form>
			</main>
		</div>
	);
};

export default Form;

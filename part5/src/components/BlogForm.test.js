import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const testblog = {
	title: 'test title',
	author: 'test author',
	url: 'test url'
}

describe('Exercises 5.16', () => {
	test('5.16.  form calls the event handler', async () => {
		const user = userEvent.setup()
		let checkInputField = false;
		const formHandler = (blog) => {
			if(testblog.title===blog.title && testblog.author===blog.author && testblog.url===blog.url)	{
				checkInputField = true
			}
		}
		const { container } = render(<BlogForm formHandler={formHandler} />)

		const inputTitle = screen.getByPlaceholderText('title')
		const inputAuthor = screen.getByPlaceholderText('author')
		const inputUrl = screen.getByPlaceholderText('url')
		const button = container.querySelector('.createBtn')

		await user.type(inputTitle, testblog.title)
		await user.type(inputAuthor, testblog.author)
		await user.type(inputUrl, testblog.url)
		
		//screen.debug()
		await user.click(button)

		expect(checkInputField===true)
	})

})
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const dummy = {
	title: 'Test blog title',
	author: 'falala',
	url:'https://x.com',
	likes:100,
	bloguser: {
		username: 'tester1',
		name: 'Peter'
	}
}

describe('Exercises 5.13.-5.15', () => {
	test('5.13. only show title and author, but not URL and likes', () => {
		const { container } = render(<Blog blog={dummy} thisUser={{}} likeHandler={() => {}} removeHandler={() => {}} />)

		//screen.debug()

		expect(container.querySelector('.title')).toHaveTextContent('Test blog title')
		expect(container.querySelector('.author')).toHaveTextContent('falala')
		expect(container.querySelector('.blog-detail')).toHaveStyle('display: none')
	})

	test('5.14. URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
		const { container } = render(<Blog blog={dummy} thisUser={{}} likeHandler={() => {}} removeHandler={() => {}} />)

		const user = userEvent.setup()
		const button = container.querySelector('.toggleBlogDetail')
		await user.click(button)

		//screen.debug()

		expect(container.querySelector('.blog-detail')).not.toHaveStyle('display: none')
	})

	test('5.15. if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
		const liked = jest.fn()
		const { container } = render(<Blog blog={dummy} thisUser={{}} likeHandler={ liked } removeHandler={() => {}} />)

		const user = userEvent.setup()
		const button = container.querySelector('.toggleLike')
		await user.click(button)
		expect(liked.mock.calls).toHaveLength(1)
		await user.click(button)
		expect(liked.mock.calls).toHaveLength(2)
	})
})
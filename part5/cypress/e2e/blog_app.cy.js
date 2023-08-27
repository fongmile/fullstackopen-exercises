const dummyUsers = [
	{
		username: 'dee',
		name: 'Dee Gor',
		password: 'password'	
	},
	{
		username: 'poki',
		name: 'Poki Ng',
		password: 'password'
	},
]

const dummyBlogs = [
	{
		title: 'test blog 1',
		author: 'Google',
		url: 'https://google.com',
		likes: 1
	},
	{
		title: 'test blog 2',
		author: 'Cypress.io',
		url: 'https://docs.cypress.io/',
		likes: 2
	} ,
	{
		title: 'test blog 3',
		author: 'Meta',
		url: 'https://investor.fb.com/',
		likes: 3
	} 
]

describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
		dummyUsers.map((x) => cy.createUser(x))
		cy.visit('')
	})

	it('5.17 Login form is shown', function () {
		cy.get('[name="Username"')
		cy.get('[name="Password"')
		cy.get('[type="submit"]').contains('login')
	})

	describe('5.18 Login',function() {
		it('succeeds with correct credentials', function() {
			let thisUser = dummyUsers[0]
			cy.get('[name="Username"').type(thisUser.username)
			cy.get('[name="Password"').type(thisUser.password)
			cy.get('[type="submit"]').click()

			cy.contains(`${thisUser.name} logged in`)
		})

		it('fails with wrong credentials', function() {
			let thisUser = dummyUsers[0]
			cy.get('[name="Username"').type(thisUser.username)
			cy.get('[name="Password"').type('wrong')
			cy.get('[type="submit"]').click()

			cy.get('.error')
				.should('contain', 'Wrong username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid')
			cy.get('html').should('not.contain', `${thisUser.name} logged in`)

		})
	})

	describe('When logged in', function() {
		const creator = dummyUsers[0]
		const otherUser = dummyUsers[1]
		beforeEach(function() {
			cy.login(creator)
		})

		it('5.19 A blog can be created', function() {
			cy.contains('blogs')
			cy.contains('new blog').click()

			cy.get('[name="title"').type('E2E new blog')
			cy.get('[name="author"').type('E2E author')
			cy.get('[name="url"').type('https://docs.cypress.io/')
			cy.get('.createBtn').click()

			cy.contains('a new blog "E2E new blog" added')
		})

		describe('several blogs exist', function() {
			beforeEach(function() {
				dummyBlogs.map((x) => cy.createBlog(x))
			})

			it('5.20 Users can like a blog', function() {
				let initLikes = 0
				let thisBlog = dummyBlogs[1]

				cy.get('.blog').contains(thisBlog.title).parents('.blog').as('thisBlog')
				cy.get('@thisBlog').find('.likesNumber').as('likes')
				
				cy.get('@likes').then(x => {
					initLikes = parseInt(x.text())
				})
				cy.get('@thisBlog').find('.toggleBlogDetail').click()
				cy.get('@thisBlog').find('.toggleLike').click()

				cy.contains(`liked "${thisBlog.title}"`)

				cy.get('@likes')
					.should(($field) => {
						const currentLikes = parseInt($field.text())
						expect(currentLikes, 'Likes').to.equal(initLikes+1)
					})
			})

			it('5.21 User who created a blog can delete it', function() {
				let thisBlog = dummyBlogs[0]

				cy.get('.blog').contains(thisBlog.title).parents('.blog').as('thisBlog')
				cy.get('@thisBlog').find('.toggleBlogDetail').click()
				cy.get('@thisBlog').find('.removeBtn').click()

				cy.on('window:confirm', () => true)

				cy.get('.blog').should('not.contain', thisBlog.title)
				cy.get('.blog').should(($b) => {
					expect($b).to.have.length(dummyBlogs.length-1)
				})
			})

			it('5.22 Only the creator can see the delete button of a blog', function() {
				dummyBlogs.map(x => {
					cy.get('.blog').contains(x.title).parents('.blog').as('blog')
					cy.get('@blog').find('.toggleBlogDetail').click()
					cy.get('@blog').find('.removeBtn')
				})
			})
			it('5.22 Non-creator cannot see the delete button of a blog', function() {
				window.localStorage.removeItem('loggedBlogUser')
				cy.login(otherUser)

				dummyBlogs.map(x => {
					cy.get('.blog').contains(x.title).parents('.blog').as('blog')
					cy.get('@blog').find('.toggleBlogDetail').click()
					cy.get('@blog').find('.removeBtn').should('not.exist');
				}) 
			})

			it.only('5.23 Blogs are ordered according to likes with the blog with the most likes being first', async function() {

				let sortedBlogs = [...dummyBlogs]
				sortedBlogs.sort((a,b) => b.likes - a.likes)
				let leastLike = sortedBlogs[sortedBlogs.length-1]
				// initial order
				cy.get('.blog')
					.should('have.length', sortedBlogs.length)
					.each(($el, i, $list) => {
						cy.get($el).should('contain', sortedBlogs[i].title)
					})
				
				// add likes
				cy.get('.blog').contains(leastLike.title).parents('.blog').as('tarBlog')
				cy.get('@tarBlog').find('.toggleBlogDetail').click()
				cy.wait(500)
				cy.get('@tarBlog').find('.toggleLike').click()
				cy.wait(500)
				cy.get('@tarBlog').find('.toggleLike').click()
				cy.wait(500)
				cy.get('@tarBlog').find('.toggleLike').click()
				cy.wait(500)
				cy.get('@tarBlog').find('.toggleLike').click()
				cy.wait(500)
				cy.get('.blog:first .title').should(($title) => {
					expect($title.text()).to.contain(leastLike.title)
				})
			})
		})
	})
})
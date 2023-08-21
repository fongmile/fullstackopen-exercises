const _ = require('lodash')

const dummy = (blogs) => {
	return 1;
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item.likes
	}

	return blogs.length === 0
		? 0
		: blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	const result = blogs.reduce((prev, curr)=> prev.likes > curr.likes ? prev : curr);
	return blogs.length===0  
							?{} 
							: {title: result.title,
								author: result.author,
								likes: result.likes}
}

const mostBlogs  = (blogs) => {
	const result = _.flow([
							_.countBy,
							_.toPairs,
							_.partialRight(_.maxBy, _.last)
						])
						(blogs, 'author')
	return blogs.length===0  
							?{} 
							: {author: result[0],
								blogs: result[1]}
}

const mostLikes = (blogs) => {
	return blogs.reduce((reduced, b) =>{
		const i = reduced.findIndex(e=>e.author===b.author)
		if(i>-1)	{
			const newObj = {...reduced[i], 'likes':reduced[i].likes+b.likes }
			reduced[i] = newObj;
		}	else {
			reduced.push({author: b.author, likes: b.likes})
		}
		return reduced;	
	},[]).reduce((prev, curr)=> prev.likes > curr.likes ? prev : curr)
}

module.exports = {
	dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes
}

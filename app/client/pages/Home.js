import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getSampleData } from '../../actions/sample/sample'
import { Helmet } from 'react-helmet'
import './Home.css'
import './Home.scss'

// Image test //
import Image1 from '../../../assets/item1.jpg'
import Image2 from '../../../assets/item2.jpg'

function Home(props) {
	useEffect(() => {
		props.getSampleData()
	}, [])

	const renderListOfSampleData = () => {
		return props.sample.map(sample => {
			return (
				<div key={sample.id}>
					<p>UserId:{sample.userId} </p>
					<p>id:{sample.id}</p>
					<p>{sample.title}</p>
					<p>{sample.body}</p>
				</div>
			)
		})
	}
	return (
		<div className='home__Container'>
			<Helmet>
				<meta property='og:title' content='How to Become an SEO Expert (8 Steps)' />
				<meta
					property='og:description'
					content='Get from SEO newbie to SEO pro in 8 simple steps.'
				/>
				<meta
					property='og:image'
					content='https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png'
				/>
			</Helmet>
			This is a basic Component
			<p>The data is fetched on the server and a full fledged html is send asap</p>
			<button onClick={e => alert('clicked on a button')}>Click me</button>
			{/* {renderListOfSampleData()} */}
			<div className='image__container'>
				<img src={Image1} alt='Image 1' />
				<img src={Image2} alt='Image 2' />
				<img src={Image1} alt='Image 3' />
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return { sample: state.sample }
}
export default {
	component: connect(mapStateToProps, { getSampleData })(Home),
	loadData: store => store.dispatch(getSampleData()),
}

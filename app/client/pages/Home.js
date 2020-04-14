import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getSampleData } from '../../actions/sample/sample'
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
		<div>
			This is a basic Component
			<p>The data is fetched on the server and a full fledged html is send asap</p>
			<button onClick={e => alert('clicked on a button')}>Click me</button>
			{renderListOfSampleData()}
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

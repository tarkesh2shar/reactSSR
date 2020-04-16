import React from 'react'

function NotFound({ staticContext = {} }) {
	staticContext.notFound = true
	return <div className='notFound'>Ooops The requested Page dont exist</div>
}
export default {
	component: NotFound,
}

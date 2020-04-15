import React from 'react'

function NotFound({ staticContext = {} }) {
	staticContext.notFound = true
	return <div>Ooops The requested Page dont exist</div>
}
export default {
	component: NotFound,
}

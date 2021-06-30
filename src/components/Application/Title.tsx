import React from 'react'
import { Helmet } from 'react-helmet'

const Title = ({title}: any) => {
    return (
        <Helmet>
            <title>{title ? process.env.REACT_APP_NAME + ' - ' + title : process.env.REACT_APP_NAME }
            </title>
        </Helmet>
    )
}

export default Title

import React from 'react'

const Button = (props: any) => {
    const { title, type } = props
    return (
        <button className="btn bg-secondary-dark hover:bg-primary" type={ type ? type : 'submit' }>{ title }</button>
    )
}

export default Button

import React from 'react'

const Button = (props: any) => {
    const { title, type, onClick } = props
    return (
        <button className="btn bg-secondary-dark hover:bg-primary" type={ type ? type : 'submit' } onClick={ onClick ? onClick : () => {}}>{ title }</button>
    )
}

export default Button

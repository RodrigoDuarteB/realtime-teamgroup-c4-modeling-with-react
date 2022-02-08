import { Route, Redirect } from 'react-router-dom'
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const GuardRoute = (props: any) => {
    const { type, ...rest } = props
    const [user] = useAuthState(auth)
    const queryString = window.location.pathname
    
    if(type === 'auth' && !user){ /* usuario no logeado intentando ingresar a una ruta */
        return queryString ? <Redirect to={`/login?redirect_to=${queryString}`} /> 
        : <Redirect to="/login" />
    }else if(type === 'public-no-auth' && user){ /* usuario logeado intentando ingresar a una ruta publica no-auth como el login */
        return <Redirect to="/" />
    }else{
        return <Route {...rest}/>
    }
}

export default GuardRoute

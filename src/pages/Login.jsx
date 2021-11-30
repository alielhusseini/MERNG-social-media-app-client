import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'
import { gql, useMutation } from "@apollo/client";
import { useForm } from '../utils/useForm';

const LOGIN_USER_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          id
          username
          email 
          createdAt
          token  
        }
    }
`

export default function Login() {
    const navigate = useNavigate()
    // const [errors, setErrors] = useState({}) // for error handeling unfortunately it needs to be adjusted... currently it's on pending mode

    const { values, onChange, onSubmit } = useForm(loginUserCallback, {username: '', password: ''}) // the mutation action (addUser) will be triggered in onSubmit, if successful the "update" function will fire

    const [addUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
        update(proxy, result) { // this function will trigger if the mutation is successful and we are assigning it to the addUser
            console.log(result)
            navigate('/', { replace: true })
        },
        onError({ graphQLErrors }) {
            console.log(graphQLErrors)
            // console.log(graphQLErrors[0].extensions.exception)
            // setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values // { username: values.username, ... }
    })

    function loginUserCallback() { addUser() }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={ loading ? "loading" : "" }>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    // error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    // error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>Login</Button>
            </Form>
            {/* { Object.keys(errors)?.length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors)?.map(value => (
                            <li key={ value }>{ value }</li>
                        ))}
                    </ul>
                </div>
            ) } */}
        </div>
    )
}
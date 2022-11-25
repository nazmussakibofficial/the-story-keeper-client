import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../Hooks/useToken';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { signIn, sigInWithGoogle } = useContext(AuthContext);
    const [userEmail, setUserEmail] = useState('');
    const [token] = useToken(userEmail);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = data => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setUserEmail(user.email);
            })
            .catch(error => {
                console.log(error.message)
            });
    }

    const handleGoogleSignin = () => {
        sigInWithGoogle()
            .then(result => {
                const user = result.user;
                saveUser(user.displayName, user.email, 'buyer')
            })
            .catch(e => console.error(e))

    }

    const saveUser = (name, email, role) => {
        const user = { name, email, role };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setUserEmail(email)
            })
    }

    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-center mb-5">Login now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 px-5">
                        <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email")} type="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password")} type="password" placeholder="password" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-secondary" value='Login' type='submit'></input>
                            </div>
                        </form>
                        <p>New to The Story Keeper? <Link className='link link-accent' to='/register'>Create a new Account</Link></p>
                        <div className="divider mt-2">OR</div>
                        <button onClick={handleGoogleSignin} className="btn btn-outline btn-accent mb-5 mx-3">Log in with google</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;
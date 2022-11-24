import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { signIn, sigInWithGoogle } = useContext(AuthContext);

    const handleLogin = data => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => {
                console.log(error.message)
            });
    }

    const handleGoogleSignin = () => {
        sigInWithGoogle()
            .then(result => {
                const user = result.user;
            })
            .catch(e => console.error(e))

    }


    return (
        <div>
            <div className="hero min-h-screen bg-[url('https://images.unsplash.com/photo-1593430980369-68efc5a5eb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1185&q=80')]">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-center text-white mb-5">Login now!</h1>
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
                                <input className="btn btn-primary" value='Login' type='submit'></input>
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
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../Hooks/useToken';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, sigInWithGoogle } = useContext(AuthContext);
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const [userEmail, setUserEmail] = useState('');
    const [token] = useToken(userEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }

    const handleSignUp = data => {
        const image = data.photo[0]
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const photo = imgData.data.url
                    createUser(data.email, data.password)
                        .then(result => {
                            const user = result.user;
                            console.log(user);
                            toast('User Created Successfully.')
                            const userInfo = {
                                photoURL: photo,
                                displayName: data.name
                            }
                            updateUser(userInfo)
                                .then(() => {
                                    saveUser(data.name, data.email, data.role)
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(error => { console.log(error) });
                }

            })

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
        const isVerified = false;
        let user = {}
        if (role === 'seller') {
            user = { name, email, role, isVerified };
        }
        else {
            user = { name, email, role };
        }
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setUserEmail(email);
            })
    }




    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-center mb-5">Register now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 px-5">
                        <form onSubmit={handleSubmit(handleSignUp)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input {...register("name")}
                                    type="text" placeholder="name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Upload your photo</span>
                                </label>
                                <input {...register("photo")} type="file" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: "Email is Required" })}
                                    type="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <p className='text-error mt-2'>{errors.email?.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", { required: "Password is Required", minLength: { value: 6, message: 'Password must be 6 characters' } })} type="password" placeholder="password" className="input input-bordered" />
                                {errors.password && <p className='text-error mt-2'>{errors.password?.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Choose your role:</span>
                                </label>
                                <select {...register('role')} className="select select-accent w-full max-w-xs">
                                    <option value='buyer'>Buyer</option>
                                    <option value='seller'>Seller</option>
                                </select>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-secondary" value='Register' type='submit'></input>
                            </div>
                        </form>
                        <p className='mx-auto'>Already Registered? <Link className='link link-accent' to='/register'>Register</Link></p>
                        <div className="divider mt-2">OR</div>
                        <button onClick={handleGoogleSignin} className="btn btn-outline btn-accent mb-5 mx-3">Log in with google</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Register;
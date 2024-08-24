import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export function SignUp() {
    const navigate = useNavigate();
    const initialValues = {
        username: "", email: "", password: "", confirm_password: "", cart: [],is_blocked:false

    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            navigate('/login');
            const { confirm_password, ...newformValues } = formValues
            axios.post("http://localhost:3000/users", newformValues);
        }
    };

    const validate = () => {
        const errors = {};
        const passwordRegex = /^(?=.*[A-Z]).{8,}$/
        console.log(passwordRegex.test(formValues.password))
        if (!formValues.username) {
            errors.username = "Username is required";
        }
        if (!formValues.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            errors.email = "Email is invalid";
        }
        if (!formValues.password) {
            errors.password = "Password is required";
        } else if (!passwordRegex.test(formValues.password)) {
            errors.password = "Password should contain at least 8 characters, it should contains one Capital letter";
        }
        if (formValues.password !== formValues.confirm_password) {
            errors.confirm_password = "Passwords do not match";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">SignUp</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="username" className="block text-gray-700 text-lg">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 text-lg"
                            placeholder="username"
                            value={formValues.username}
                            onChange={handleChange}
                        />
                        {formErrors.username && <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-gray-700 text-lg">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 text-lg"
                            placeholder="you@gmail.com"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                        {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block text-gray-700 text-lg">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 text-lg"
                            placeholder="********"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                        {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="confirm_password" className="block text-gray-700 text-lg">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 text-lg"
                            placeholder="********"
                            value={formValues.confirm_password}
                            onChange={handleChange}
                        />
                        {formErrors.confirm_password && <p className="text-red-500 text-sm mt-1">{formErrors.confirm_password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-700 text-white py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 text-lg"
                    >
                        SignUp
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
          Already have an Account? <Link to={'/login'} className="text-gray-700 hover:underline">Login</Link>
        </p>
            </div>
        </div>
    );
}

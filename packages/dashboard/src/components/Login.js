import React from 'react';
import useForm from '../hooks/useForm';

const Login = () => {
    const initialData = { email: '', password: '' };
    const [formData, setFormData, resetForm] = useForm(initialData);

    function handleSubmit(e) {
        e.preventDefault();
        resetForm();
    }

    return (
        <div>
            <h1>Login app de cruces jaja xd</h1>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <input
                    placeholder="Email"
                    value={formData.email}
                    name="email"
                    onChange={setFormData}
                />
                <br />
                <input
                    placeholder="Password"
                    type="password"
                    value={formData.password}
                    name="password"
                    onChange={setFormData}
                />
                <br />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default Login;

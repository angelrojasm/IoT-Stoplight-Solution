import React from 'react';
import useForm from '../hooks/useForm';

const Login = ({ setUser }) => {
    const initialData = { email: '', password: '' };
    const [formData, setFormData, resetForm] = useForm(initialData);

    async function handleSubmit(e) {
        e.preventDefault();
        resetForm();

        const req = await fetch(`/login`, {method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(formData)})
        const user = await req.json();
        
        if (req.status === 200) {
            window.localStorage.setItem('user', JSON.stringify({user}));
            setUser(user);
        } else {
            resetForm();
            alert("invalid user")
        }
    }

    return (
        <div>
            <h1>Login app de cruces 💈</h1>
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

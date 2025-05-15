import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/userApi';

const AdminLogin = () => {

    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap();
      navigate('/dashboard')
    } catch (err) {
      console.log(err);
      alert('Login failed!');
    }
  };

  return (
    <form onSubmit={loginHandler}>
      <h2>Admin Login</h2>
      <input type="email" onChange={e => setEmail(e.target.value)} required />
      <input type="password" onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;

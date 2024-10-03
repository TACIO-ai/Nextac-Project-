// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [registerData, setRegisterData] = useState({ username: '', password: '' });
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState('');

  const [products] = useState([
    { id: 1, name: 'Curso de Programação', price: 150 },
    { id: 2, name: 'Ebook de JavaScript', price: 50 },
    { id: 3, name: 'Template de Website', price: 100 },
  ]);

  const handleRegister = () => {
    const { username, password } = registerData;
    if (username && password) {
      setUsers([...users, { username, password }]);
      setRegisterData({ username: '', password: '' });
      alert('Conta criada com sucesso!');
    } else {
      alert('Preencha todos os campos.');
    }
  };

  const handleLogin = () => {
    const { username, password } = loginData;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setCurrentUser(user);
      setLoginData({ username: '', password: '' });
    } else {
      alert('Credenciais incorretas.');
    }
  };

  const handlePurchase = (product) => {
    setCart([...cart, product]);
    setNotification('${product.name} foi adicionado ao carrinho!');

    // Remove a notificação após 3 segundos
    setTimeout(() => {
      setNotification('');
    }, 3000); // Verifique se a vírgula e o fechamento de parênteses estão corretos
  };

  return (
    <div className="App">
      <h1>Nextac</h1>
      
      {currentUser ? (
        <>
          <p>Bem-vindo, {currentUser.username}!</p>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.name} - R$ {product.price}
                <button onClick={() => handlePurchase(product)}>Adicionar ao Carrinho</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>
          <h2>Criar Conta</h2>
          <input
            type="text"
            placeholder="Nome de usuário"
            value={registerData.username}
            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
          />
          <button onClick={handleRegister}>Cadastrar</button>

          <h2>Login</h2>
          <input
            type="text"
            placeholder="Nome de usuário"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
          <button onClick={handleLogin}>Entrar</button>
        </div>
      )}

      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}

export default App;
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Container, ErrorHelperText, Form, FormContainer, Input, InputContainer, LogoContainer } from './styles';
import { useForm } from 'react-hook-form';
import { api } from '../../hooks/api';
import Logo from '../../assets/Logo-Food-Explorer.png';
import { useState } from 'react';

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  async function handleSignUp(data) {
    if (!data.name || !data.email || !data.password) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      setIsLoading(true);
      await api.post('/users', data)
        .then(response => {
          alert('Usuário cadastrado com sucesso!');
          navigate("/");
        })
        .catch(error => {
          if (error.response) {
            alert(error.response.data.message);
            if (error.response.data.message === "Este email já esta em uso.") {
              setError('email', {
                type: 'manual',
                message: 'Este email já está em uso'
              });
            }
          } else {
            alert('Erro ao cadastrar usuário');
          }
        });
    } catch (error) {
      console.error('error signup: ', error);
      alert('Erro ao cadastrar usuário');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <LogoContainer>
        <img src={Logo} alt="Ícone Food Explorer" />
        <h1>food explorer</h1>
      </LogoContainer>

      <FormContainer>
        <Form onSubmit={handleSubmit(handleSignUp)}>
          <h2>Crie sua conta</h2>

          <InputContainer>
            <label htmlFor='name'>Nome</label>
            <Input
              type="text"
              {...register('name', { required: 'Campo obrigatório' })}
              placeholder='Exemplo: Maria da Silva'
            />
            {errors.name && <ErrorHelperText>{errors.name.message}</ErrorHelperText>}
          </InputContainer>

          <InputContainer>
            <label htmlFor='email'>Email</label>
            <Input
              type="text"
              {...register('email', { required: 'Campo obrigatório' })}
              placeholder='Exemplo: exemplo@exemplo.com.br'
            />
            {errors.email && <ErrorHelperText>{errors.email.message}</ErrorHelperText>}
          </InputContainer>

          <InputContainer>
            <label htmlFor='password'>Senha</label>
            <Input
              type="password"
              {...register('password', {
                required: 'Campo obrigatório',
                minLength: {
                  value: 3,
                  message: 'Senha deve ter no mínimo 3 caracteres'
                }
              })}
              placeholder='No mínimo 3 caracteres'
            />
            {errors.password && <ErrorHelperText>{errors.password.message}</ErrorHelperText>}
          </InputContainer>

          <Button text='Criar conta' type='submit' loading={isLoading} />

          <Link to="/">Já tenho uma conta</Link>
        </Form>
      </FormContainer>
    </Container>
  )
}

# Jitterbit API

## Clone do Projeto

```bash
git clone https://github.com/matheuscooper/Jitterbit.git
cd Jitterbit
npm install
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=
JWT_SECRET=super
JWT_EXPIRES_IN=1d
```

## Login de Administrador

Faça uma requisição `POST /login` para obter seu token:

```json
{
  "email": "admin@jitterbit.com",
  "password": "123456"
}
```

Use o token retornado no header `Authorization` de todas as requisições protegidas:

```
Authorization: Bearer <token>
```

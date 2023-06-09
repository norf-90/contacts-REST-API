# Users

---

## General information:

```JS
const baseURl = "https://contacts-backend-s2mm.onrender.com/api"
```

---

## Users:

### User registration (signup):

endpoint: `/user/register`

method: `POST`

FormData:

```
name: required
email: required
password: required
avatar: optional, random by default

```

responce:

```
{
    Bill:{
        email: "bill@mail.com"
        supscription: "starter"
    }
}
```

After registration user will get veryfication link on his email.

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед
  кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

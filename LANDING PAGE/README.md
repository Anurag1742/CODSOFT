# Landing Page + MongoDB Backend

This project is a static landing page with a small Node.js/Express backend connected to MongoDB.

## Setup

1) Install dependencies

```bash
npm install
```

2) Configure environment variables

- Copy `.env.example` to `.env` (already done if you ran the setup command)
- Set `MONGODB_URI`

Local MongoDB example:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/landing_page
```

MongoDB Atlas example:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/landing_page?retryWrites=true&w=majority
```

3) Start the server

```bash
npm start
```

Then open:
- http://localhost:3000/index.html
- http://localhost:3000/login.html

## API

- `POST /api/auth/register` `{ username, email, password }`
- `POST /api/auth/login` `{ email, password }`
- `GET /api/health`

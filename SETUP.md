# How to run locally

## Prerequisites

Name                          | Installation
------------------------------|-----------------------------------
NodeJS v18                    | https://nodejs.org/en
Yarn                          | ```npm i -g yarn```
Python v3.10                  | https://www.python.org/downloads/
MongoDB database              | https://www.mongodb.com/
Expo Go on your mobile device | https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US , https://apps.apple.com/us/app/expo-go/id982107779

### Mobile app

#### `mobile`

Go to /mobile/src/requests/routes.ts and change the `SERVER_IP` to your server IP address:

```
const SERVER_IP = "";
```

In terminal:
```shell
cd mobile
yarn
yarn dev
```

Scan qr code with expo go mobile app:

![image](https://github.com/RobzLegz/spotloc/assets/62758448/1a6fe550-f201-4dc2-8b15-0e9ed8150a0f)

#### `server`

Create a `.env` file in the root of `server` folder:

```
PORT="5000"
CLIENT_URL="http://localhost:3000"
VALIDATOR_TOKEN_SECRET="quickstack_code_eagle"
ENGINE_URL=""
DATABASE_URL=""
ACCESS_TOKEN_SECRET=""
REFRESH_TOKEN_SECRET=""
ORGANIZER_TOKEN_SECRET=""
ACTIVATION_TOKEN_SECRET=""
AWS_REGION_VAR=""
AWS_S3_ACCESS_KEY_ID=""
AWS_S3_SECRET_ACCESS_KEY=""
AWS_S3_BUCKET_NAME=""
SENDGRID_API_KEY=""
SENDER_EMAIL=""
GEOLOCATION_API_KEY=""
ENGINE_SECRET_TOKEN=""
```

`ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, `ORGANIZER_TOKEN_SECRET`, `ACTIVATION_TOKEN_SECRET` - Random 50 character long string

`DATABASE_URL` - Your mongodb connection url

`ENGINE_SECRET_TOKEN` - Random secret code (same as in engine env `AUTH_SECRET`)

`ENGINE_URL` - URL or IP to engine + /recommendation (for example `http://localhost:8000/recommendation`)

`AWS_REGION_VAR` - S3 AWS region (for example `eu-north-1`)

`AWS_S3_ACCESS_KEY_ID`, `AWS_S3_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET_NAME` - AWS S3 credentials

`SENDGRID_API_KEY`, `SENDER_EMAIL` - email delivering service credentials https://sendgrid.com (optional)

`GEOLOCATION_API_KEY` - Google geocoding api key

In terminal:

```shell
cd server
yarn
npx prisma db push
npx prisma generate
yarn dev
```

#### `engine`
Go to the `engine` folder and create a new Python virtual environment and activate it with the appropriate activation script depending on your OS:
```shell
python3.10 -m venv venv
venv/Scripts/activate.bat
```
Install the requirements with:
```shell
pip install -r requirements.txt
```
Add a `.env` file to the root of the `engine` folder with the following contents:
```
DATABASE_URL="your-mongodb-connection-url"
AUTH_SECRET="engine-secret-token-same-as-in-server-env-file"
```
Then run the engine with the command (change host and port values based on needs):
```shell
uvicorn server:app --host 127.0.0.1 --port 8000
```

### Website

#### `website`

Create a `.env.local` file in the root of `website` folder:

```
NEXT_PUBLIC_SERVER_URL="http://localhost:5000"
```

In terminal:

```shell
cd website
yarn
yarn dev
```

#### `server`

Create a `.env` file in the root of `server` folder:

```
PORT="5000"
CLIENT_URL="http://localhost:3000"
VALIDATOR_TOKEN_SECRET="quickstack_code_eagle"
ENGINE_URL=""
DATABASE_URL=""
ACCESS_TOKEN_SECRET=""
REFRESH_TOKEN_SECRET=""
ORGANIZER_TOKEN_SECRET=""
ACTIVATION_TOKEN_SECRET=""
AWS_REGION_VAR=""
AWS_S3_ACCESS_KEY_ID=""
AWS_S3_SECRET_ACCESS_KEY=""
AWS_S3_BUCKET_NAME=""
SENDGRID_API_KEY=""
SENDER_EMAIL=""
GEOLOCATION_API_KEY=""
ENGINE_SECRET_TOKEN=""
```

`ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, `ORGANIZER_TOKEN_SECRET`, `ACTIVATION_TOKEN_SECRET` - Random 50 character long string

`DATABASE_URL` - Your mongodb connection url

`ENGINE_SECRET_TOKEN` - Random secret code (same as in engine env `AUTH_SECRET`)

`ENGINE_URL` - URL or IP to engine + /recommendation (for example `http://localhost:8000/recommendation`)

`AWS_REGION_VAR` - S3 AWS region (for example `eu-north-1`)

`AWS_S3_ACCESS_KEY_ID`, `AWS_S3_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET_NAME` - AWS S3 credentials

`SENDGRID_API_KEY`, `SENDER_EMAIL` - email delivering service credentials https://sendgrid.com (optional)

`GEOLOCATION_API_KEY` - Google geocoding api key

In terminal:

```shell
cd server
yarn
npx prisma db push
npx prisma generate
yarn dev
```

### Webscraper

#### `webscraper`

Create a `credentials.py` file in the root of `webscraper` folder:

```
username = "spotloc_local"
password = "spotloc_local"

fb_email = "spotloc_local"
fb_password = "spotloc_local"

S3_BUCKET_NAME=""
S3_REGION=''
AWS_S3_ACCESS_KEY_ID=""
AWS_S3_SECRET_ACCESS_KEY=""
```

`S3_REGION` - S3 AWS region (for example `eu-north-1`) (same as server)

`AWS_S3_ACCESS_KEY_ID`, `AWS_S3_SECRET_ACCESS_KEY`, `S3_BUCKET_NAME` - AWS S3 credentials (same as server)

Go to the `engine` folder and create a new Python virtual environment and activate it with the appropriate activation script depending on your OS:
```shell
python3.10 -m venv venv
venv/Scripts/activate.bat
```

Install the requirements with:
```shell
pip install -r requirements.txt
```

```shell
cd webscraper
python app.py
```

### Admin panel

#### `backend`

Create a `.env` file in the root of `backend` folder:

```
PORT="5000"
DATABASE_URL=""
GEOLOCATION_API_KEY=""
```

`DATABASE_URL` - Your mongodb connection url (same as server)

`GEOLOCATION_API_KEY` - Google geocoding api key (same as server)

In terminal:

```shell
cd backend
yarn
npx prisma db push
npx prisma generate
yarn dev
```

#### `cms`

Create a `.env.local` file in the root of `cms` folder:

```
NEXT_PUBLIC_SERVER_URL="http://localhost:5000"
```

In terminal:

```shell
cd cms
yarn
yarn dev
```

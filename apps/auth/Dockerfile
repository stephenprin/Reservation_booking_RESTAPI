# Stage 1: Development
FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production
FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -g npm && npm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/apps/auth/main" ]

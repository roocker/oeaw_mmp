FROM node:lts-alpine 
WORKDIR /app

COPY ./package.json .

RUN npm i

COPY . .

ENV HOST=0.0.0.0
ENV PORT=5178
EXPOSE 5178
RUN addgroup --system --gid 12222 lukefileserva &&\
adduser --system --uid 12222 lukefileserva &&\
chown -R lukefileserva:lukefileserva /app 

CMD ["npm", "run", "dev"]


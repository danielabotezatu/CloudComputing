FROM node:18.19.0-alpine

RUN addgroup app && adduser -S -G app app
RUN mkdir /app && chown app:app /app
WORKDIR /app
USER app

COPY --chown=app:node package*.json ./
RUN npm install
COPY --chown=app:node . .

EXPOSE 3006

CMD ["npm", "start"]

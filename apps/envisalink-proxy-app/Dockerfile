FROM node:18

COPY . /app
WORKDIR /app
RUN npm install && \
    npm run build

CMD ["npm", "start"]

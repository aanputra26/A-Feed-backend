FROM node:18-buster

WORKDIR /app

ENV ACCESS_TOKEN_SECRET=hdkasdhioehadadnakdnskdhasn8a98yd9adha
ENV REFRESH_TOKEN_SECRET = jkjhdoidhaohdod89679y578dihdkd6766443hhjdk

ENV DB_USER=root
ENV DB_PASS=123456
ENV DB_HOST=34.50.66.133
ENV DB_NAME=auth_capstone
ENV DB_DIALECT=mysql

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "start"]

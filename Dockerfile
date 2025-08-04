FROM node:18.20.6
RUN mkdir /project
WORKDIR /project
RUN npm install -g @angular/cli
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]

#RUN npm run build -- --configuration=production
#WORKDIR /app/dist/store
#CMD ["ng", "serve", "--host", "0.0.0.0" , "--configuration" , "production"]

#CMD ["http-server", "-p", "4200", "-P", "http://backend:5024"]
# CMD ["http-server", "-p", "4200"]
#EXPOSE 4200

FROM node:carbon

# App directory
WORKDIR /usr/src/app

# Move files
COPY . .

# Build
RUN npm install
RUN npm run build

# App runs on port 8080 by default
EXPOSE 8080
CMD [ "npm", "start" ]

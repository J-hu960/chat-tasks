# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build


# Start the server using the production build
CMD [ "node", "dist/main.js" ]

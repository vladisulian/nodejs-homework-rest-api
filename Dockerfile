FROM node

WORKDIR /node-hw

# copy package and . . .
COPY package*.json ./

# install dep's
RUN npm ci

# copy all files 
COPY . . 

# ENV PORT or EXPOSE [PORT INTEGER]  
ENV PORT=3000 

# launch app
CMD ['npm', 'start']
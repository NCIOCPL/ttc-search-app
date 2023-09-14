FROM ubuntu:latest

# Install any required dependencies
RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive \
  apt-get install -yq \
  curl

# Install NVM
# nvm environment variables
ENV NVM_DIR /usr/local
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.39.5/install.sh | bash

# Copy the script into the container
COPY ./src /rss/src
COPY package.json package-lock.json .nvmrc .npmrc run.sh /rss/

# install node and npm
RUN . $NVM_DIR/nvm.sh \
  && cd /rss \
	&& nvm install \
  && nvm use \
	&& npm ci --omit=dev \
	&& NODE_BINARY_PATH=$(whereis node | awk '{print $2}') \
	&& sed -i "s|node|${NODE_BINARY_PATH}|" /rss/run.sh \
	&& chmod +x /rss/run.sh

# Set the working directory
WORKDIR /rss

FROM ubuntu:24.04

# working directory
WORKDIR /app

# deps
RUN apt-get update && apt-get -y install wget curl git

# install anaconda3
RUN curl -O https://repo.anaconda.com/archive/Anaconda3-2020.11-Linux-x86_64.sh
RUN chmod 777 ./Anaconda3-2020.11-Linux-x86_64.sh 
RUN ./Anaconda3-2020.11-Linux-x86_64.sh -b 
RUN source ~/.bashrc

# install nodejs 18
RUN curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh
RUN chmod 777 nodesource_setup.sh
RUN ./nodesource_setup.sh
RUN apt-get install -y nodejs
RUN npm install -g yarn

# copy folders
COPY interface /app/interface
COPY backend /app/backend

# check conda 
RUN conda -V

# create env 
RUN conda create -n env_v10 python=3.9

# pip install
RUN cd backend && conda activate env_v10 && pip install -r requirements.txt

# build frontend
RUN set -e ;\ 
    cd frontend && \
    rm -rf node_modules yarn.lock || true

RUN cd frontend && yarn && yarn build

# chmod 
RUN chmod 777 run.sh

# entrypoint
ENTRYPOINT ["/bin/bash", "-c", "cd /app/backend && ./run.sh"]
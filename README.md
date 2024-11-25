

## Install Python Anaconda
```
$ curl -O https://repo.anaconda.com/archive/Anaconda3-2020.11-Linux-x86_64.sh
$ ./Anaconda3-2020.11-Linux-x86_64.sh
$ source ~/.bashrc

$ conda -V
```

## Setup Python Anaconda ENV
```
$ conda create -n env_v10 python=3.9

$ conda activate env_v10

$ conda deactivate

$ pip install -r requirements.txt
```

## Debug Port
```
$ apt-get install -y psmisc

$ fuser -k 25/tcp

$ apt-get install lsof

$ lsof -i :25

```
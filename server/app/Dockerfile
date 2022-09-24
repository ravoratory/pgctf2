FROM python:3.10-slim-buster as builder

WORKDIR /code
COPY requirements.txt /code/

RUN apt update
RUN apt install -y gcc
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

FROM python:3.10-slim-buster

COPY --from=builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=builder /usr/local/bin/uwsgi /usr/local/bin/uwsgi

WORKDIR /code
COPY . /code/

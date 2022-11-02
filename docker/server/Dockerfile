FROM python:3.10.7-slim-buster as builder

WORKDIR /app

RUN apt update
RUN apt install -y gcc
RUN pip install --upgrade pip

COPY requirements.txt /app/
RUN pip install -r requirements.txt

FROM python:3.10.7-slim-buster

RUN useradd -r -s /bin/false django

COPY --from=builder --chown=100:django /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=builder --chown=100:django  /usr/local/bin/uwsgi /usr/local/bin/uwsgi

WORKDIR /app

COPY --chown=100:django server/ .

USER django
EXPOSE 8080

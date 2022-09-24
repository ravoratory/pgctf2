# pgctf2
A new playground-ctf site.

# Server
## Requirements
- Docker
- compose v2
- GNU make
- flake8 (linter)
- black (formatter)
- isort (formatter)

## Environments
- Python 3.10
- Django 4.1.1
- Django-REST-framework 3.14.0
- PostgreSQL

## ローカルで実行
```sh
cp example.env .env
make up
```

## Django admin画面
```sh
make createsuperuser
```
を実行してsuper userを作成

[https://localhost:8080/admin](https://localhost:8080/admin)でログイン画面
```
ID: root
Password: password
```


## minio
[https://localhost:9090](https://localhost:9090)でminioのコンソールに入れます
```
ID: minio
Password: password
```

## django startapp
templateを使うため通常の`django-admin startapp app_name`は使用せず
```
make startapp APP_NAME=app_name
```
を実行して作成してください

`urls.py`や`serializers.py`があらかじめ含まれた状態になります

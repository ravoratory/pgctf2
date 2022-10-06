# pgctf2
A new playground-ctf site.

## 主な使用技術
<!-- 増えたら追加していってください -->
- [Python](https://www.python.org/) 3.10
- [Django](https://www.djangoproject.com/) 4.1
- [Django REST framework](https://www.django-rest-framework.org/) 3.14
- [PostgreSQL](https://www.postgresql.org/)

## ローカル環境
- [Docker](https://www.docker.com/)
- [compose v2](https://docs.docker.com/compose/)
- [GNU Make](https://www.gnu.org/software/make/)
- [venv](https://docs.python.org/ja/3/library/venv.html)
- [flake8](https://github.com/PyCQA/flake8)
- [black](https://github.com/psf/black)
- [isort](https://github.com/PyCQA/isort)

## ローカルで実行
```sh
cp server/example.env server/.env
docker compose up --build
```

## pre-commit
```sh
pip install pre-commit
pre-commit install
```

## Django admin画面
```sh
make createsuperuser
```
を実行してsuper userを作成

[http://localhost:8080/admin](http://localhost:8080/admin)でログイン画面
```
ID: root
Password: password
```


## minio
[http://localhost:9090](http://localhost:9090)でminioのコンソールに入れます
```
ID: minio
Password: password
バケット名: pgctf-bucket
```

## django startapp
templateを使うため通常の`django-admin startapp app_name`は使用せず
```
make startapp APP_NAME=app_name
```
を実行して作成してください

`urls.py`や`serializers.py`があらかじめ含まれた状態になります

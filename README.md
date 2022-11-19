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

## ローカルでAPIサーバ(Django)を動かす
```sh
# 初回のみ
cp server/example.env server/.env
docker volume create pgctf2-dbdata
docker volume create pgctf2-miniodata
# 毎回
docker compose up --build
```

## pre-commit
pre-commitを使用するとcommit前にlintが走るようになります(formatはされません)
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
[http://localhost:9001](http://localhost:9001)でminioのコンソールに入れます
```
ID: minioadmin
Password: minioadmin
バケット名: pgctf-bucket
```

## django startapp
templateを使うため通常の`django-admin startapp app_name`は使用せず
```
make startapp APP_NAME=app_name
```
を実行して作成してください

`urls.py`や`serializers.py`があらかじめ含まれた状態になります


## puma-dev
Railsアプリで使われているツールですが、[puma-dev](https://github.com/puma/puma-dev)を使用すると`pgctf2.text`のようなホスト名で開発環境に入れます

Install (Mac OS X)
```sh
brew install puma/puma/puma-dev
```

起動
```sh
sudo puma-dev -setup
puma-dev -install
echo "http://localhost:8080" > ~/.puma-dev/pgctf2
```

[http://pgctf2.test](http://pgctf2.test)にアクセスできるようになります

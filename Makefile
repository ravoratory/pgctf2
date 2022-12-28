SHELL = /bin/sh

.PHONY: makemigrations
makemigrations:
	./bin/docker-compose-exec-or-run web \
	python manage.py makemigrations

.PHONY: migrate
migrate:
	./bin/docker-compose-exec-or-run web \
	python manage.py makemigrations

.PHONY: startapp
startapp:
	cd server; \
	python manage.py startapp --template ../django_app_template.tar.gz $(APP_NAME)

.PHONY: createsuperuser
createsuperuser:
	./bin/docker-compose-exec-or-run web \
	python manage.py createsuperuser --noinput

.PHONY: loaddata
loaddata:
	./bin/docker-compose-exec-or-run web \
	python manage.py loaddata ./fixtures/fixtures.yaml

.PHONY: db
db:
	docker compose exec db \
	psql -h 127.0.0.1 -p 5432 -U pg -W postgres

.PHONY: lint
lint:
	python -m flake8 server
	python -m black --check server
	python -m isort --check server

.PHONY: format
format:
	python -m black server
	python -m isort server

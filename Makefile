SHELL = /bin/sh

.PHONY: makemigrations
makemigrations:
	docker compose exec web \
	python manage.py makemigrations

.PHONY: startapp
startapp:
	cd server; \
	python manage.py startapp --template ../django_app_template.tar.gz $(APP_NAME)

.PHONY: createsuperuser
createsuperuser:
	docker compose exec web \
	python manage.py createsuperuser --noinput

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

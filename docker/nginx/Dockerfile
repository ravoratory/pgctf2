FROM nginx:1.23.1-alpine as prod

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/production.conf /default.conf.template
COPY ./nginx/uwsgi_params /etc/nginx/uwsgi_params

CMD ["/bin/sh" , "-c" , "envsubst '${SERVER_HOST}' < /default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]

FROM nginx:1.23.1-alpine as dev

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/develop.conf /default.conf.template

CMD ["/bin/sh" , "-c" , "envsubst '${SERVER_HOST}' < /default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]

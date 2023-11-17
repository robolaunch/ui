FROM ubuntu:20.04
RUN apt-get update
RUN ln -fs /usr/share/zoneinfo/Europe/Istanbul /etc/localtime
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends tzdata
RUN apt-get update && apt-get install -y wget curl vim mlocate apache2
RUN a2enmod rewrite
ADD build /var/www/html/
COPY .htaccess /var/www/html/.htaccess
COPY 000-default.conf /etc/apache2/sites-enabled/
RUN echo ServerName 127.0.0.1 >> /etc/apache2/apache2.conf
ENTRYPOINT ["apachectl", "-D", "FOREGROUND"] 
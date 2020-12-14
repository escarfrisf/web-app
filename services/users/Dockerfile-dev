# image base
FROM python:3.7.2-slim
 
# instalando netcat
RUN apt-get update && \
    apt-get -y install netcat && \
    apt-get clean
 
# estableciendo directorio de trabajo
WORKDIR /usr/src/app
 
# copiando e instalando requirements
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt
 
# copiando entrypoint.sh
COPY ./entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh
 
# copiando app
COPY . /usr/src/app
 
# ejecutando server
CMD ["/usr/src/app/entrypoint.sh"]

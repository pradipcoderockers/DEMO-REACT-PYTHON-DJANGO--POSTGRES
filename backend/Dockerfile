FROM python:3.6.7-alpine3.8

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add --no-cache postgresql-client postgresql-contrib postgresql-dev bash g++ linux-headers

ADD ./requirements.txt /tmp/

# Install PyPi dependencies
WORKDIR /tmp
RUN pip install --upgrade pip && pip install -r requirements.txt

RUN apk del build-deps

ADD . /code/

RUN mkdir -p /data/staticserve
RUN mkdir -p /data/uploads

RUN chmod -R a+rw /data

ADD entrypoint.sh /
RUN chmod +x /entrypoint.sh

WORKDIR /code/

COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

EXPOSE 8000

CMD /./entrypoint.sh

FROM python:3.6-alpine3.7

RUN apk add --update gcc postgresql-dev && \
  apk add musl-dev && \
  # Required by uWSGI
  apk add linux-headers

# WORKDIR creates the directory if necessary.
WORKDIR /app

ADD ./requirements.txt ./

RUN pip install -r requirements.txt

ADD ./ /app

CMD python app.py

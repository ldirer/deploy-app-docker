FROM python:3.6

RUN mkdir /app
WORKDIR /app

ADD ./requirements.txt ./

RUN pip install -r requirements.txt

ADD ./ /app

CMD python app.py

FROM python:3.6

# WORKDIR creates the directory if necessary.
WORKDIR /app

ADD ./requirements.txt ./

RUN pip install -r requirements.txt

ADD ./ /app

CMD python app.py

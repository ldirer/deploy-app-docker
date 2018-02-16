from flask import Flask

app = Flask(__name__)

app.config['DEBUG'] = True


@app.route('/')
def hello_docker():
    return 'Now this really runs from docker!'


if __name__ == '__main__':
    app.run('0.0.0.0')

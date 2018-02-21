from random import shuffle

from datetime import datetime
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.dialects.postgresql import JSONB
from werkzeug.exceptions import BadRequest

app = Flask(__name__)

app.config.from_object('backend.settings')

db = SQLAlchemy(app)


@app.route('/api')
def hello_docker():
    return 'Now this really runs from docker!'


@app.route('/api/questions', methods=['GET'])
def questions():
    return jsonify({
        'results': [q.to_json() for q in QuizQuestion.query.order_by(func.random()).limit(10)]
    })


@app.route('/api/scores', methods=['POST'])
def submit_score():
    required_fields = ['questions', 'userName']
    data = request.json

    if not all(f in data for f in required_fields):
        raise BadRequest(description=f'One of the required fields {required_fields} is missing.')

    answer_logs = []
    for question in data['questions']:
        log = AnswerLog(question_id=question['id'], user_answer=question['userAnswer'])
        answer_logs.append(log)

    game = Game()
    game.user_name = data['userName']
    game.answer_logs = answer_logs

    db.session.add(game)

    db.session.commit()

    return jsonify(game.to_json()), 201


@app.route('/api/scores', methods=['GET'])
def latest_scores():
    games = Game.query.order_by(Game.created_datetime.desc()).limit(10)
    return jsonify({'results': [
        game.to_json() for game in games
    ]}), 200


# Models

class QuizQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text())
    answer = db.Column(db.Text())

    # A list of answers. Has to contain the actual answer!
    # TODO: or in a separate table with correct answers? and 'correct', 'plausible', 'nonsense'? Next step mb.
    choices = db.Column(JSONB())

    # You know, throw stuff in there. `metadata` is a reserved sqlalchemy keyword so cant use that.
    data = db.Column(JSONB(), default={})

    def to_json(self) -> dict:
        keys = ['id', 'text', 'answer', 'choices', 'data']
        as_dict = {k: getattr(self, k) for k in keys}

        # shuffle the choices (inplace) so the first answer is not always the correct one!
        shuffle(as_dict['choices'])

        return as_dict


class Game(db.Model):
    """This keeps track of what questions were answered in a game and how (what was picked)."""
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.Text())

    # We should only store utc times.
    created_datetime = db.Column(db.DateTime(), index=True, default=datetime.utcnow)

    @property
    def score(self):
        """Return n_correct_answers, n_questions."""
        # That's probably vastly inefficient. But eh.
        answers_correctness = [answer_log.user_answer == answer_log.question.answer for answer_log in self.answer_logs]
        return sum(answers_correctness), len(answers_correctness)

    def to_json(self):
        return {
            'id': self.id,
            'userName': self.user_name,
            'score': {
                'nCorrect': self.score[0],
                'nQuestions': self.score[1]
            }
        }


class AnswerLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    question_id = db.Column(db.ForeignKey(QuizQuestion.id), nullable=False)
    game_id = db.Column(db.ForeignKey(Game.id), nullable=False)
    user_answer = db.Column(db.Text())

    question = db.relationship(QuizQuestion, backref='answer_logs', foreign_keys=[question_id])
    game = db.relationship(Game, backref='answer_logs', foreign_keys=[game_id])


if __name__ == '__main__':
    app.run('0.0.0.0')

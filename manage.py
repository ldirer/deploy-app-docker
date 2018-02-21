import os

from flask_script import Manager, Server, Shell
from flask_migrate import Migrate, MigrateCommand

from backend.app import app, db, QuizQuestion, AnswerLog
from backend.fixtures import sample_questions

"""
I should probably be using the newish flask cli. But you need an extension to get `shell` to work with ipython. 
Come on.
"""


manager = Manager(app)


def make_shell_context():
    return {c.__name__: c for c in [QuizQuestion, AnswerLog]}


manager.add_command('runserver', Server(host='0.0.0.0', port=5000, threaded=True, use_reloader=True))
manager.add_command("shell", Shell(make_context=make_shell_context))


@manager.command
def init_fixtures():
    """Populate the database with some data for testing purposes."""
    print('Fixtures created in db!')
    qs = sample_questions()
    for q in qs:
        db.session.add(q)
    db.session.commit()


@manager.command
def reset_db():
    """Drop the database and recreate it."""
    db.drop_all()
    db.create_all()


migrate = Migrate(app, db, directory=os.path.join(os.path.dirname(__file__), 'migrations'))
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()

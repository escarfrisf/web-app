# services/users/project/__init__.py


import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_debugtoolbar import DebugToolbarExtension
from flask_cors import CORS
# from sqlalchemy import exc

# instantiate the db
db = SQLAlchemy()
toolbar = DebugToolbarExtension()
cors = CORS()

# nuevo
def create_app(script_info=None):

    # instanciado la  app
    app = Flask(__name__)

    # set config
    app_settings = os.getenv('APP_SETTINGS')
    app.config.from_object(app_settings)

    # configurar la extension
    db.init_app(app)
    toolbar.init_app(app)
    cors.init_app(app)

    # registrar blueprints
    from project.api.users import users_blueprint
    app.register_blueprint(users_blueprint)

    # contexto shell para flask cli
    @app.shell_context_processor
    def ctx():
        return {'app': app, 'db': db}

    return app

# services/users/project/tests/test_config.py

import os
import unittest

from flask import current_app
from flask_testing import TestCase
from project import create_app
# from project import app

app = create_app()


class TestDevelopmentConfig(TestCase):
    def create_app(self):
        app.config.from_object('project.config.DevelopmentConfig')
        return app

    def test_app_is_development(self):
        self.assertEqual(
             app.config['SECRET_KEY'], os.environ.get('SECRET_KEY')
        )
        self.assertFalse(current_app is None)
        self.assertTrue(
            app.config['SQLALCHEMY_DATABASE_URI'] ==
            os.environ.get('DATABASE_URL')
        )
        self.assertTrue(app.config['DEBUG_TB_ENABLED'])  # nuevo
        self.assertTrue(app.config['BCRYPT_LOG_ROUNDS'] == 4)  # nuevo
        self.assertTrue(app.config['TOKEN_EXPIRATION_DAYS'] == 30)    # nuevo
        self.assertTrue(app.config['TOKEN_EXPIRATION_SECONDS'] == 0)  # nuevo


class TestTestingConfig(TestCase):
    def create_app(self):
        app.config.from_object('project.config.TestingConfig')
        return app

    def test_app_is_testing(self):
        self.assertEqual(
             app.config['SECRET_KEY'], os.environ.get('SECRET_KEY')
        )
        self.assertTrue(app.config['TESTING'])
        self.assertFalse(app.config['PRESERVE_CONTEXT_ON_EXCEPTION'])
        self.assertTrue(
            app.config['SQLALCHEMY_DATABASE_URI'] ==
            os.environ.get('DATABASE_TEST_URL')
        )
        self.assertFalse(app.config['DEBUG_TB_ENABLED'])  # nuevo
        self.assertTrue(app.config['BCRYPT_LOG_ROUNDS'] == 4)  # nuevo
        self.assertTrue(app.config['TOKEN_EXPIRATION_DAYS'] == 0)     # nuevo
        self.assertTrue(app.config['TOKEN_EXPIRATION_SECONDS'] == 3)  # nuevo


class TestProductionConfig(TestCase):
    def create_app(self):
        app.config.from_object('project.config.ProductionConfig')
        return app

    def test_app_is_production(self):
        self.assertEqual(app.config['SECRET_KEY'],
                         os.environ.get('SECRET_KEY'))
        self.assertFalse(app.config['TESTING'])
        self.assertFalse(app.config['DEBUG_TB_ENABLED'])  # nuevo
        self.assertTrue(app.config['BCRYPT_LOG_ROUNDS'] == 13)  # nuevo
        self.assertTrue(app.config['TOKEN_EXPIRATION_DAYS'] == 30)    # nuevo
        self.assertTrue(app.config['TOKEN_EXPIRATION_SECONDS'] == 0)  # nuevo


if __name__ == '__main__':
    unittest.main()

from peewee import *


db = SqliteDatabase('database.db')


class User(Model):
    name = CharField(max_length=50)
    email = CharField(max_length=150, unique=True)
    password = CharField(max_length=100)

    class Meta:
        database = db

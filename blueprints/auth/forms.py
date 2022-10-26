from flask_wtf import FlaskForm
from wtforms.fields import StringField, PasswordField
from wtforms.validators import Email, EqualTo, DataRequired, Length

class AuthLoginForm(FlaskForm):
    email = StringField('email', validators=[
        DataRequired(),
        Email(),
    ])
    password = PasswordField('password', validators=[
        DataRequired(),
    ])


class AuthRegisterForm(FlaskForm):
    name = StringField('name', validators=[
        DataRequired(),
        Length(min=3, max=50)
    ])
    email = StringField('email', validators=[
        DataRequired(),
        Email(),
    ])
    password = PasswordField('password', validators=[
        DataRequired(),
        Length(min=6, max=20)
    ])
    confirm_password = PasswordField('confirm_password', validators=[
        DataRequired(),
        EqualTo('password', message='Passwords do not match!')
    ])

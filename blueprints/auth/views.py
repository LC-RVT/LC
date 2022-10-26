from flask import Blueprint, session, url_for, redirect, render_template, flash
from werkzeug.security import check_password_hash, generate_password_hash
from .forms import AuthLoginForm, AuthRegisterForm
from blueprints.user.models import User

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('login', methods=['GET', 'POST'])
def login():
    form = AuthLoginForm()

    if form.validate_on_submit():
        email = form.email.data
        password = form.password.data

        existing_user = User.get_or_none(User.email == email)
        if not existing_user:
            flash(f'User {email} is not registered!', category='danger')
            return redirect(url_for('auth.login'))

        if not check_password_hash(existing_user.password, password):
            flash(f'User {email} password is not correct!', category='danger')
            return redirect(url_for('auth.login'))

        flash(f'User {email} logged in!', category='success')
        session['is_logged_in'] = True
        session['user_id'] = existing_user.id
        session['user_email'] = existing_user.email
        return redirect(url_for('home'))

    return render_template('auth/login.html', form=form)


@bp.route('logout')
def logout():
    session.clear()
    return redirect(url_for('home'))


@bp.route('register', methods=['GET', 'POST'])
def register():
    form = AuthRegisterForm()

    if form.validate_on_submit():
        email = form.email.data
        existing_user = User.get_or_none(User.email == email)
        if existing_user:
            flash(f'User {email} already exists!', category='danger')
            return redirect(url_for('auth.register'))

        password_hash = generate_password_hash(form.password.data)
        User.create(
            name=form.name.data,
            email=form.email.data,
            password=password_hash,
        )

        flash(f'User {email} registered successfully!', category='success')
        return redirect(url_for('auth.login'))

    return render_template('auth/register.html', form=form)

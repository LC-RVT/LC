from flask import Flask, render_template
from blueprints.auth.views import bp as bp_auth

app = Flask(__name__)
app.secret_key = 'qwerty123'
if __name__ == "__main__":
    app.run(debug=True)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

app.register_blueprint(bp_auth)

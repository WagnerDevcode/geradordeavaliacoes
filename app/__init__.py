from flask import Flask
from .routes import main


def create_app():
    app = Flask(__name__)

    # Definir a chave secreta para sessões
    app.config["SECRET_KEY"] = (
        "uma-chave-secreta-muito-segura"  # Altere para uma chave secreta realmente segura e única
    )

    # Configuração do diretório de uploads
    app.config["UPLOAD_FOLDER"] = "static/uploads"

    # Registrar blueprint
    app.register_blueprint(main)

    return app

import csv
import os

QUESTOES_CSV_PATH = "questoes.csv"
UPLOAD_FOLDER = "static/uploads"


def adicionar_questao(disciplina, autor, enunciado, alternativas, correta, imagem=None):
    nova_questao = [disciplina, autor, enunciado] + alternativas + [correta, imagem]
    file_exists = os.path.isfile(QUESTOES_CSV_PATH)

    with open(QUESTOES_CSV_PATH, mode="a", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)

        if not file_exists:
            writer.writerow(
                [
                    "Disciplina",
                    "Autor",
                    "Enunciado",
                    "Alternativa A",
                    "Alternativa B",
                    "Alternativa C",
                    "Alternativa D",
                    "Alternativa E",
                    "Correta",
                    "Imagem",
                ]
            )

        writer.writerow(nova_questao)


def carregar_questoes():
    questoes = []

    if not os.path.isfile(QUESTOES_CSV_PATH):
        return questoes

    with open(QUESTOES_CSV_PATH, mode="r", newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            questoes.append(row)

    return questoes


def salvar_avaliacao_csv(questoes_selecionadas, nome_arquivo):
    avaliacao_path = os.path.join(UPLOAD_FOLDER, f"{nome_arquivo}.csv")

    with open(avaliacao_path, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(
            [
                "Disciplina",
                "Autor",
                "Enunciado",
                "Alternativa A",
                "Alternativa B",
                "Alternativa C",
                "Alternativa D",
                "Alternativa E",
                "Correta",
                "Imagem",
            ]
        )

        for questao in questoes_selecionadas:
            writer.writerow(
                [
                    questao["Assunto"],
                    questao["Autor"],
                    questao["Enunciado"],
                    questao["Alternativa A"],
                    questao["Alternativa B"],
                    questao["Alternativa C"],
                    questao["Alternativa D"],
                    questao["Alternativa E"],
                    questao["Correta"],
                    questao["Imagem"],
                ]
            )

from celery import Celery
from time import sleep

app = Celery("tasks", broker="amqp://localhost")


@app.task
def reverse(text):
    sleep(5)
    return text[::-1]

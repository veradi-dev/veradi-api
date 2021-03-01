# Base Docker지정
FROM python:3

# 프로젝트가 실행될 경로 지정
WORKDIR /usr/src/app

ENV PYTHONUNBUFFERED 1

# apt-get
RUN apt-get update
RUN apt-get install -y mdbtools
# requirements.txt 경로 지정 및 실행
RUN pip install --upgrade pip

COPY requirements.txt ./
RUN pip install -r requirements.txt

# 복사할 프로젝트 내용물 지정
COPY . .

# 어플리케이션이 실행될 포트 지정
EXPOSE 8000

# gunicorn 실행 설정
#CMD ["gunicorn", "-b", "0.0.0.0:8000", "config.wsgi:application"]


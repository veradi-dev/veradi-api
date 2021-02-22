# Base Docker지정
FROM python:3

# 프로젝트가 실행될 경로 지정
WORKDIR /usr/src/app

# 환경 변수 지정
ENV SECRETKEY cq08g^(c&)cgex_b)+h$%055#rke4*q&rfag#ies81r+q-mxh(
ENV DEBUG True
ENV DATABASE_NAME postgres
ENV DATABASE_HOST veradi-api-test.col5on2odijb.ap-northeast-2.rds.amazonaws.com
ENV DATABASE_USERNAME veradi
ENV DATABASE_PASSWORD veradi1234
ENV DATABASE_PORT 5432

# requirements.txt 경로 지정 및 실행
RUN pip install --upgrade pip

COPY requirements.txt ./
RUN pip install -r requirements.txt

# 복사할 프로젝트 내용물 지정
COPY . .

# 몰라
COPY ./entrypoint.sh /
ENTRYPOINT ["sh", "/entrypoint.sh"]

# 어플리케이션이 실행될 포트 지정
EXPOSE 8000



# gunicorn 실행 설정
CMD ["gunicorn", "-b", "0.0.0.0:8000", "config.wsgi:application"]


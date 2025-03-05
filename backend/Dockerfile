FROM python:3.11.4-alpine
RUN apk add --no-cache bash
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt
RUN mkdir /app/staticfiles
RUN mkdir /app/media

RUN adduser -D admin
RUN chown -R admin:admin /app/media /app/staticfiles

COPY ./entrypoint.sh .
RUN chmod +x /app/entrypoint.sh

COPY . .
USER admin
ENTRYPOINT ["/app/entrypoint.sh"]
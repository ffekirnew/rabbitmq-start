FROM python:3.10.0-alpine3.13

RUN addgroup -S app && adduser -S app -G app

WORKDIR /app
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chown -R app:app /app

EXPOSE 5000

USER app

CMD ["make", "run"]

FROM alpine
WORKDIR /home/app

RUN apk update
RUN apk upgrade
RUN apk add python3 npm make
ENV VIRTUAL_ENV=/opt/venv
RUN python -m venv ${VIRTUAL_ENV}
# This accomplishes the same thing as activating the virtualenv.
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY . .

RUN npm i --prefix ./src/frontend
RUN python -m pip install -r ./src/backend/requirements.txt
RUN make build
RUN python src/backend/manage.py migrate

EXPOSE 8000
ENTRYPOINT ["python", "src/backend/manage.py"]
CMD ["runserver", "0.0.0.0:80"]


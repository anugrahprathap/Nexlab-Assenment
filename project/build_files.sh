# build_files.sh
pip install -r requirements.txt
pip install --no-binary :all: pysqlite

python3.9 manage.py collectstatic
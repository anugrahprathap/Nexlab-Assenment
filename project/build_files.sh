# build_files.sh
pip install -r requirements.txt
pip install db-sqlite3

python3.9 manage.py collectstatic
# build_files.sh
pip install -r requirements.txt
echo '*'*100
sudo yum install sqlite sqlite-devel


python3.9 manage.py collectstatic
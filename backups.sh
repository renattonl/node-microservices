docker exec db-nacos-mysql /usr/bin/mysqldump -u root --password=AJsCmT1nIb0 db > $PWD/databases/nacos/nacos.sql
docker exec db-transaction-mysql /usr/bin/mysqldump -u root --password=AJsCmT1nIb0 db > $PWD/databases/transaction/transaction.sql
docker exec db-security-postgres /bin/bash -c "export PGPASSWORD=pass && /usr/bin/pg_dump -U user db" > ./databases/security/security.sql
docker exec db-account-postgres /bin/bash -c "export PGPASSWORD=pass && /usr/bin/pg_dump -U user db" > ./databases/account/account.sql
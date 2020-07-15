chown -R mongodb:mongodb /todo-data
exec mongod --bind_ip_all --dbpath todo-data
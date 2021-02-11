select * from cartdb;
select * from productdb where isAvailable = 1 and harga = 10000; 
select * from productdb;
select * from roledb;
select * from transaction;
select * from transactionitem;
select * from userdb;
-- /products?hargamin
select * from productdb where harga > 12000;
-- /products?hargamaxcartdbcartdb
select * from productdb where harga < 50000;
-- /products?hargamin&hargamax
select * from productdb where harga >= 20000 and harga < 50000;

update productdb set nama = 'Jeruk Bali', stock = 11 where id = 18;

select * from cartdb;
select 
	c.id,
    u.username, 
    p.nama, 
    c.qty, 
    (c.qty * p.harga) as 'total harga'
from cartdb c 
join userdb u on c.userID = u.id 
join productdb p on p.id = c.productID
where c.userID = 15;

select * from imagedb;
select * from productdb;
select * from userdb;

select * from chat;

select
	c.id, u.username, c.message, c.time
from chat c
join userdb u on u.id = c.userID;

select * from mysql.user;
ALTER USER 'bangjekss'@'%' IDENTIFIED WITH mysql_native_password BY 'lolipop9098';
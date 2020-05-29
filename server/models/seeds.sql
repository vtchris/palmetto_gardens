USE palmetto;

INSERT INTO settings (companyName, address1, city, state, zipCode, email, phone1, taxRate)
VALUES (
		'Palmetto Farms',
		'3062 HWY 601 N',
        'Pageland',
        'SC',
        '29728',
        'vtchris.2357@gmail.com',
        '(704) 555-1111',
        .06 );

INSERT INTO articles (title, content, category, img )
VALUES('Company History',"Since 1939 Palmetto Farms has been known for producing quality farm products.  In the 1940's, 50's, and 60's Press Palmetto, our grandfather, raised cotton, tobacco and watermelons.  During the 70's, 80's, and 90's, Mack Palmetto, along with his wife and four sons continued raising watermelons and assorted produce.  Today Palmetto Farms is led by Jason and Ryan Palmetto who continue the farming tradition as a supplier of top quality pineneedles and produce.",1,''),
('About','Welcome to Palmetto Farms the leader in top quality pine needles and produce.  We take pride in quickly delivering only the best quality pine straw available.  Our services include delivery and professional spreading.',1,''),
('Pine Straw Delivery','Our services include delivering only the best quality longleaf pine needles year round. No matter the size we deliver any quantity from 15 bales to thousands.
We also completely clean driveways and curb areas after delivery and/or spreading. This is just another way we show our commitment to quality service.',2,''),
('Palmetto Farms Signature Spreading','Professional spreading is also available year round. This consists of hand spreading, cleaning all hard surfaces of pine straw, blow rolling of all edges, tucking and placing pineneedles under plant material, removing pine straw from plant foliage and a final clean up of the site.',2,''),
('Pick Your Own','Pick your own blackberries, blueberries, grapes (Muscadine and Scuppernong), and strawberries',3,'');
		
INSERT INTO categories (category, img)
VALUES 	('Landscaping Materials','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2bUzkOMLfQ64nQ5ExyxKZMKQ4SIbwVVPMLxk2HpIxJw-FXoAa&usqp=CAU'), 
		('Firewood','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSSaY2UkGk8onq_COeeXY1vHjuC8md5OpLSOJwkmPCkEoj4lodU&usqp=CAU'), 
        ('Produce','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQzmuKqP7fSuyiLj_eaG2WuciOAZfrJc0e2hbLPFF8qGyvNyn4T&usqp=CAU'), 
       	('Gift Baskets','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHWgL-CAnvBIYRpIx0WSug3DVfrmogkKgz8bUHGvwcOXcUugALcQpH9S3uSJdmpOmqAr9GQyo&usqp=CAc'); 

INSERT INTO products (itm_name, itm_nbr,itm_img, itm_cost, itm_prc, itm_unit_of_measure, itm_description, taxable,  active,CategoryId)
VALUES 	('Pine needles', 100, 'assets/images/products/pinestraw.jpg', 3, 4.5, 'bale','We use only the best premium Carolina Native Longleaf pine straw. For best results spread new pine straw once or twice a year.',true,true,1), 
		('Red Mulch', 200,null, 2, 4.99, '2 cu ft',null, true,true,1),
		('Black Mulch', 210,null, 2, 4.99, '2 cu ft',null,true,true,1),
		('Brown Mulch', 220,null, 2, 4.99, '2 cu ft',null,true,true,1),		      
        ('Cedar Mulch', 230,null, 1.75, 4.49, '2 cu ft',null,true,true,1),
        ('Frosted Asst Fruit Bags', 500, null, 2, 4.99, '7x3.5x10.5 3.75 lbs','Christmas Fruit Baskets Home Delivered!',true,true,4),
        ('Hexagonal Bamboo Basket', 501, null, 2, 9.95, '8x7x2.5 2.3 lbs','Christmas Fruit Baskets Home Delivered!',true,true,4),
        ('Firewood (seasonal)', 400, null, 25, 49, '20 cu ft',null,true,true,2);
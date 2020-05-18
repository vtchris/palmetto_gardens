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
		
INSERT INTO categories (category, img)
VALUES 	('Landscaping materials','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2bUzkOMLfQ64nQ5ExyxKZMKQ4SIbwVVPMLxk2HpIxJw-FXoAa&usqp=CAU'), 
		('Firewood','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSSaY2UkGk8onq_COeeXY1vHjuC8md5OpLSOJwkmPCkEoj4lodU&usqp=CAU'), 
        ('Produce','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQzmuKqP7fSuyiLj_eaG2WuciOAZfrJc0e2hbLPFF8qGyvNyn4T&usqp=CAU'), 
       	('Gift Baskets','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHWgL-CAnvBIYRpIx0WSug3DVfrmogkKgz8bUHGvwcOXcUugALcQpH9S3uSJdmpOmqAr9GQyo&usqp=CAc'); 

INSERT INTO products (itm_name, itm_nbr,itm_img, itm_cost, itm_prc, itm_unit_of_measure, itm_description, taxable,  active,CategoryId)
VALUES 	('Pine needles', 100, 'assets/imgages/products/pinestraw.jpg', 3, 4.5, 'bale','We use only the best premium Carolina Native Longleaf pine straw. For best results spread new pine straw once or twice a year.',true,true,1), 
		('Red Mulch', 200,null, 2, 4.99, '2 cu ft',null, true,true,1),
		('Black Mulch', 210,null, 2, 4.99, '2 cu ft',null,true,true,1),
		('Brown Mulch', 220,null, 2, 4.99, '2 cu ft',null,true,true,1),		      
        ('Brown Mulch', 220,null, 2, 4.99, '2 cu ft',null,true,true,1),
        ('Frosted Asst Fruit Bags', 500, null, 2, 4.99, '7x3.5x10.5 3.75 lbs','Christmas Fruit Baskets Home Delivered!',true,true,4),
        ('Hexagonal Bamboo Basket', 501, null, 2, 9.95, '8x7x2.5 2.3 lbs','Christmas Fruit Baskets Home Delivered!',true,true,4),
        ('Firewood (seasonal)', 400, null, 25, 49, '20 cu ft',null,true,true,2);
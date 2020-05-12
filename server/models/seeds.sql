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
		
INSERT INTO categories (category)
VALUES 	('Landscapint materials'), 
		('Firewood'), 
        ('Produce'), 
       	('Gift Baskets'); 

INSERT INTO products (itm_name, itm_nbr, itm_cost, itm_prc, itm_unit_of_measure, taxable, active,CategoryId)
VALUES 	('Pine needles - Premium Carolina Native Longleaf', 100, 3, 4.5, 'bale',true,true,1), 
		('Red Mulch', 200, 2, 4.99, '2 cu ft',true,true,1),
		('Black Mulch', 210, 2, 4.99, '2 cu ft',true,true,1),
		('Brown Mulch', 220, 2, 4.99, '2 cu ft',true,true,1),		      
        ('Brown Mulch', 220, 2, 4.99, '2 cu ft',true,true,1),
        ('Frosted Asst Fruit Bags', 500, 2, 4.99, '7x3.5x10.5 3.75 lbs',true,true,4),
        ('Firewood (seasonal)', 400, 25, 49, '20 cu ft',true,true,2);
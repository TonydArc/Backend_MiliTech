type RowObj = {
	name: [string, boolean];
	progress: string;
	quantity: number;
	date: string; 
};

const tableDataCheck: RowObj[] = [
	{
		name: [ 'Dell Inspiron 14 5440 - 71034770', true ],
		quantity: 32,
		progress: '31.5%',
		date: '24 Jan 2021',
	},
	{
		name: [ 'Lenovo Ideapad Slim 5 16IMH9 - 83DC001SVN', true ],
		quantity: 25,
		progress: '21.3%',
		date: '13 Mar 2021',
	},
	{
		name: [ 'Asus TUF Gaming A15 FA506NF-HN005W', true ],
		quantity: 19,
		progress: '17.5%',
		date: '12 Jan 2021',
	},
	{
		name: [ 'Asus ROG Zephyrus G14 GA403UV-QS171W', true ],
		quantity: 14,
		progress: '12.2%',
		date: '24 Oct 2022',
	},
	{
		name: [ 'ASUS Vivobook S 14 OLED S5406MA-PP028W', true ],
		quantity: 7,
		progress: '10.8%',
		date: '21 Feb 2021',
	},
];

export default tableDataCheck;

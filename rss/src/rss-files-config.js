const rss = [
	{
		title: 'Medical Devices',
		description: 'Available Technologies from the Technology Transfer Center.',
		filters:
			'field_govdelivery:true AND field_ics:NCI AND (field_applications:"Medical Devices" OR field_applications:"Non-Medical Devices")',
		link: 'https://techtransfer.cancer.gov/rss/medical_devices.xml',
		xmlFilename: 'medical_devices',
	},
	{
		title: 'Diagnostics',
		description: 'Available Technologies from the Technology Transfer Center.',
		filters:
			'field_govdelivery:true AND field_ics:NCI AND (field_applications:Diagnostics)',
		link: 'https://techtransfer.cancer.gov/rss/diagnostics.xml',
		xmlFilename: 'diagnostics',
	},
	{
		title: 'Research Materials',
		description: 'Available Technologies from the Technology Transfer Center.',
		filters:
			'field_govdelivery:true AND field_ics:NCI AND (field_applications:"Research Materials")',
		link: 'https://techtransfer.cancer.gov/rss/research_materials.xml',
		xmlFilename: 'research_materials',
	},
	{
		title: 'Therapeutics',
		description: 'Available Technologies from the Technology Transfer Center.',
		filters:
			'field_govdelivery:true AND field_ics:NCI AND (field_applications:Therapeutics)',
		link: 'https://techtransfer.cancer.gov/rss/therapeutics.xml',
		xmlFilename: 'therapeutics',
	},
	{
		title: 'Software and Apps',
		description: 'Available Technologies from the Technology Transfer Center.',
		filters:
			'field_govdelivery:true AND field_ics:NCI AND (field_applications:"Software / Apps")',
		link: 'https://techtransfer.cancer.gov/rss/software_and_apps.xml',
		xmlFilename: 'software_and_apps',
	},
	{
		title: 'Vaccines',
		description: 'Available Technologies from the Technology Transfer Center.',
		filters:
			'field_govdelivery:true AND field_ics:NCI AND (field_applications:Vaccines)',
		link: 'https://techtransfer.cancer.gov/rss/vaccines.xml',
		xmlFilename: 'vaccines',
	},
];

module.exports = rss;

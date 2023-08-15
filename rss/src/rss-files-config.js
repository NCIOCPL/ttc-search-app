const rss = [
	{
		title: 'Medical Devices',
		description: 'Available Technologies from the Technology Transfer Center.',
		filters:
			'field_govdelivery:true AND (field_data_source:NCI) AND (field_applications:"Medical Devices" OR field_applications:"Non-Medical Devices")',
		channelLink: '/rss/medical_devices.xml',
		itemLink: '/available-technologies?abstract=',
		xmlFilename: 'medical_devices',
	},
	{
		title: 'Diagnostics',
		description: 'Available Technologies from the Technology Transfer Center.',
		filters:
			'field_govdelivery:true AND (field_data_source:NCI) AND (field_applications:Diagnostics)',
		channelLink: '/rss/diagnostics.xml',
		itemLink: '/available-technologies?abstract=',
		xmlFilename: 'diagnostics',
	},
	{
		title: 'Research Materials',
		description: 'Available Technologies from the Technology Transfer Center.',
		filters:
			'field_govdelivery:true AND (field_data_source:NCI) AND (field_applications:"Research Materials")',
		channelLink: '/rss/research_materials.xml',
		itemLink: '/available-technologies?abstract=',
		xmlFilename: 'research_materials',
	},
	{
		title: 'Therapeutics',
		description: 'Available Technologies from the Technology Transfer Center.',
		filters:
			'field_govdelivery:true AND (field_data_source:NCI) AND (field_applications:Therapeutics)',
		channelLink: '/rss/therapeutics.xml',
		itemLink: '/available-technologies?abstract=',
		xmlFilename: 'therapeutics',
	},
	{
		title: 'Software and Apps',
		description: 'Available Technologies from the Technology Transfer Center.',
		filters:
			'field_govdelivery:true AND (field_data_source:NCI) AND (field_applications:"Software / Apps")',
		channelLink: '/rss/software_and_apps.xml',
		itemLink: '/available-technologies?abstract=',
		xmlFilename: 'software_and_apps',
	},
	{
		title: 'Vaccines',
		description: 'Available Technologies from the Technology Transfer Center.',
		filters:
			'field_govdelivery:true AND (field_data_source:NCI) AND (field_applications:Vaccines)',
		channelLink: '/rss/vaccines.xml',
		itemLink: '/available-technologies?abstract=',
		xmlFilename: 'vaccines',
	},
];

module.exports = rss;

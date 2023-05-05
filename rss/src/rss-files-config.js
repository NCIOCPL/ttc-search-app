const rss = [
	{
		title: 'Medical Devices',
		description: 'Available Technologies from the Technology Transfer Center.',
		link: 'http://www.example.com',
		facetFilterFields: [
			'field_ics:NCI',
			[
				'field_applications:Medical Devices',
				'field_applications:Non-Medical Devices',
			],
		],
	},
	{
		title: 'Diagnostics',
		description: 'Available Technologies from the Technology Transfer Center.',
		link: 'http://www.example.com',
		facetFilterFields: ['field_ics:NCI', 'field_applications:Diagnostics'],
	},
	{
		title: 'Research Materials',
		description: 'Available Technologies from the Technology Transfer Center.',
		link: 'http://www.example.com',
		facetFilterFields: [
			'field_ics:NCI',
			'field_applications:Research Materials',
		],
	},
	{
		title: 'Therapeutics',
		description: 'Available Technologies from the Technology Transfer Center.',
		link: 'http://www.example.com',
		facetFilterFields: ['field_ics:NCI', 'field_applications:Therapeutics'],
	},
	{
		title: 'Software and Apps',
		description: 'Available Technologies from the Technology Transfer Center.',
		link: 'http://www.example.com',
		facetFilterFields: ['field_ics:NCI', 'field_applications:Software / Apps'],
	},
	{
		title: 'Vaccines',
		description: 'Available Technologies from the Technology Transfer Center.',
		link: 'http://www.example.com',
		facetFilterFields: ['field_ics:NCI', 'field_applications:Vaccines'],
	},
];

module.exports = rss;

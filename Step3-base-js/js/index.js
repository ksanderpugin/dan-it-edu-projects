"use strict";

const DATA = [
	{
		"first name": "James",
		"last name": "Anderson",
		photo: "./img/trainers/trainer-m1.jpg",
		specialization: "Pool",
		category: "master",
		experience: "8 years",
		description:
			"James has many years of experience working with swimmers. He is engaged in high-quality training of athletes at international competitions. His methodology is based on the latest training technologies.",
	},
	{
		"first name": "Grace",
		"last name": "Martin",
		photo: "./img/trainers/trainer-f1.png",
		specialization: "Gym",
		category: "specialist",
		experience: "2 years",
		description:
			"Grace specializes in working with weight machines. She has developed a unique program for gaining muscle mass. Her clients are always satisfied with the results.",
	},
	{
		"first name": "Michael",
		"last name": "Johnson",
		photo: "./img/trainers/trainer-m2.jpg",
		specialization: "Kids club",
		category: "instructor",
		experience: "1 year",
		description:
			"Michael works with children of all ages. He has created game techniques for developing coordination and dexterity. His lessons are always interesting and useful for kids.",
	},
	{
		"first name": "Ella",
		"last name": "Harris",
		photo: "./img/trainers/trainer-f2.jpg",
		specialization: "Fight Club",
		category: "master",
		experience: "10 years",
		description:
			"Ella is an expert in martial arts. She trains professionals and beginners. Her approach to training helps athletes achieve high results.",
	},
	{
		"first name": "William",
		"last name": "Brown",
		photo: "./img/trainers/trainer-m3.jpg",
		specialization: "Gym",
		category: "instructor",
		experience: "1 year",
		description:
			"William focuses on working with fitness and cardio. He has perfected his techniques over many years. His students are always in shape and energetic.",
	},
	{
		"first name": "Evelyn",
		"last name": "White",
		photo: "./img/trainers/trainer-f3.jpg",
		specialization: "Pool",
		category: "specialist",
		experience: "4 years",
		description:
			"Evelyn specializes in synchronized swimming. She coaches teams of various levels. Her teams always take prizes in competitions.",
	},
	{
		"first name": "David",
		"last name": "Miller",
		photo: "./img/trainers/trainer-m4.jpg",
		specialization: "Fight Club",
		category: "instructor",
		experience: "1 year",
		description:
			"David has experience in studying various martial arts. He teaches combat techniques and tactics. His students win victories at international tournaments.",
	},
	{
		"first name": "Abigail",
		"last name": "Thomas",
		photo: "./img/trainers/trainer-f4.jpg",
		specialization: "Kids club",
		category: "specialist",
		experience: "3 years",
		description:
			"Abigail has developed a unique program for preschoolers. She helps children develop physical and mental skills. Her classes are always fun and dynamic.",
	},
	{
		"first name": "John",
		"last name": "Wilson",
		photo: "./img/trainers/trainer-m5.jpg",
		specialization: "Gym",
		category: "master",
		experience: "10 years",
		description:
			"John specializes in functional training. He has developed a number of effective training programs. His clients quickly achieve the desired results.",
	},
	{
		"first name": "Harper",
		"last name": "Anderson",
		photo: "./img/trainers/trainer-f5.jpg",
		specialization: "Pool",
		category: "specialist",
		experience: "4 years",
		description:
			"Harper is an expert in water sports. She conducts training in aqua gymnastics and aerobics. Her students demonstrate impressive results in competitions.",
	},
	{
		"first name": "Robert",
		"last name": "Moore",
		photo: "./img/trainers/trainer-m6.jpg",
		specialization: "Fight Club",
		category: "master",
		experience: "12 years",
		description:
			"Robert is a recognized martial arts master. He trains champions in various weight categories. His techniques are considered one of the most effective in the world of martial arts.",
	},
	{
		"first name": "Mia",
		"last name": "Taylor",
		photo: "./img/trainers/trainer-f6.jpg",
		specialization: "Kids club",
		category: "instructor",
		experience: "1 year",
		description:
			"Mia has extensive experience working with children. She organizes a variety of sports games and activities. Her classes always help children develop social skills and team spirit.",
	},
	{
		"first name": "Charles",
		"last name": "Taylor",
		photo: "./img/trainers/trainer-m7.jpg",
		specialization: "Gym",
		category: "specialist",
		experience: "2 years",
		description:
			"Charles is an expert in CrossFit and functional training. He has developed his own programs for different age groups. His students often win awards at fitness tournaments.",
	},
	{
		"first name": "Amelia",
		"last name": "Moore",
		photo: "./img/trainers/trainer-f7.jpg",
		specialization: "Pool",
		category: "instructor",
		experience: "1 year",
		description:
			"Amelia focuses on aquatic health and fitness programs. She trains people of all levels. Her students report improved health and well-being after classes.",
	},
	{
		"first name": "Thomas",
		"last name": "Harris",
		photo: "./img/trainers/trainer-m8.jpg",
		specialization: "Fight Club",
		category: "specialist",
		experience: "2 years",
		description:
			"Thomas is an expert in Taekwondo and Kickboxing. He teaches techniques, tactics and fighting strategies. His students often become champions at national and international competitions.",
	},
	{
		"first name": "Charlotte",
		"last name": "Wilson",
		photo: "./img/trainers/trainer-f8.jpg",
		specialization: "Kids club",
		category: "master",
		experience: "7 years",
		description:
			"Charlotte has developed a comprehensive program for the development of children's physical and intellectual skills. She conducts classes in a playful manner. Her methodology helps children become active and intelligent.",
	},
	{
		"first name": "Daniel",
		"last name": "Clark",
		photo: "./img/trainers/trainer-m9.jpg",
		specialization: "Pool",
		category: "master",
		experience: "11 years",
		description:
			"Daniel has many years of experience working with swimmers. He is engaged in high-quality training of athletes at international competitions. His methodology is based on the latest training technologies.",
	},
	{
		"first name": "Isabella",
		"last name": "Davis",
		photo: "./img/trainers/trainer-f9.jpg",
		specialization: "Gym",
		category: "specialist",
		experience: "2 years",
		description:
			"Isabella specializes in working with weight machines. She has developed a unique program for gaining muscle mass. Her clients are always satisfied with the results.",
	},
	{
		"first name": "Matthew",
		"last name": "Lewis",
		photo: "./img/trainers/trainer-m10.jpg",
		specialization: "Kids club",
		category: "instructor",
		experience: "1 year",
		description:
			"Matthew works with children of all ages. He has created game techniques for developing coordination and dexterity. His lessons are always interesting and useful for kids.",
	},
	{
		"first name": "Sophia",
		"last name": "Brown",
		photo: "./img/trainers/trainer-f10.jpg",
		specialization: "Fight Club",
		category: "master",
		experience: "8 years",
		description:
			"Sophia is a martial arts master. She has studied various techniques and styles that she works with her students. Her approach to teaching meets the highest standards.",
	},
	{
		"first name": "Joseph",
		"last name": "Walker",
		photo: "./img/trainers/trainer-m11.jpg",
		specialization: "Gym",
		category: "instructor",
		experience: "1 year",
		description:
			"Joseph specializes in functional training. He has developed his own system of exercises to strengthen the core. His students always get visible results.",
	},
	{
		"first name": "Olivia",
		"last name": "Smith",
		photo: "./img/trainers/trainer-f11.jpg",
		specialization: "Pool",
		category: "specialist",
		experience: "6 years",
		description:
			"Olivia works with aqua gymnastics. She has learned different techniques and swimming styles. Her classes help clients relax and improve their physical fitness.",
	},
	{
		"first name": "Andrew",
		"last name": "Hall",
		photo: "./img/trainers/trainer-m12.png",
		specialization: "Kids club",
		category: "master",
		experience: "10 years",
		description:
			"Andrew specializes in the development of children's sports. He has developed a unique program for toddlers. His methods ensure the harmonious development of children.",
	},
	{
		"first name": "Emily",
		"last name": "Johnson",
		photo: "./img/trainers/trainer-f12.jpg",
		specialization: "Fight Club",
		category: "specialist",
		experience: "5 years",
		description:
			"Emily is a well-known trainer at a women's fight club. She has learned various self-defense techniques. Her approach allows her students to feel confident in any situation.",
	},
];

document.addEventListener('DOMContentLoaded', () => {
	const loaderScript = document.createElement('script');
	loaderScript.src = "./js/loader.js";
	document.body.append(loaderScript);
});

window.onload = () => {
	const trainersScript = document.createElement('script');
	trainersScript.src = "./js/trainers.js";
	document.body.append(trainersScript);
}
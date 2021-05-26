'use strict';
const faker = require('faker');


function randomNum() { // min and max included 
  let min = 2
  let max =6
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let answers = [
			{
				body: 'The American College of Sports Medicine (ACSM) recommends getting 150 minutes of moderate intensity physical activity per week to achieve the health benefits, maintain current weight, and/or prevent weight gain.',
				questionId: randomNum(),
				authorId: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				body: "Kids lift weight all the time, and more than most adults. Think about how often a kid climbs up a tree or jungle gym. They are lifting their entire body weight. When they piggy back one another, they carry a friends' entire body weight on their back whilst running.",
				questionId: 2,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				body: 'It takes 3,500 calories to gain or lose one pound. To lose one pound per week, you need to decrease your calories by 500 every day. This is usually done by cutting 250 calories out of your diet and burning the other 250 through activity.',
				questionId: 3,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				body: 'Whether or not your clients will get bigger muscles (hypertrophy) depends on three basic factors: genetics, gender and training intensity. Genetics is mostly manifested as muscle fiber type; people with predominantly fast-twitch fibers acquire larger muscles more easily than people with predominantly slow-twitch fibers. In relation to gender, males acquire larger muscles than females do, because males have greater amounts of testosterone and other sex hormones that influence protein metabolism (Tipton 2001). Thus, females experience less muscle hypertrophy with strength improvement than males do (Lewis et al. 1986). Training intensity is the only factor you can control.',
				questionId: 4,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
      },
      // ! New Answers
			{
				body: 'You should aim to do at least 30 minutes of cardio at 60 to 85 percent of your maximum heart rate four to six times per week',
				questionId: 5,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				body: 'In order, treadmill is the best, bike is second and elliptical is definitely third. Running on a treadmill is the closest thing to simulating actual running, and youre getting the most complete full-body workout with the least restricted range of motion. On a bike, even though your motion is restricted, youre still using natural body movements, and the positioning goes along with your natural alignment',
				questionId: 6,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				body: "Interval Training! With each interval you complete, you're adding intensity, and when you operate at a higher intensity level, you start burning actual fat, not just calories.",
				questionId: 7,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				body: 'Do a mix of cardio and strength training and also focus on stability exercises! A great example of this would be the plank exercise',
				questionId: 8,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				body: 'Your body reacts to changes. When you do the same thing over and over, it gets used to it and your metabolism makes adjustments. Shock your system by changing up the workouts that youre doing and add different activities into your life.',
				questionId: 9,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				body: 'Begin exercise and aim to keep your heart rate up between 60 to 85 percent of your maximum," Lovitt says. "This will ensure that your body is in a fat-burning zone, thus warding off fatigue later in the day',
				questionId: 10,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				body: 'Practice makes perfect! "Doing an activity repetitiously, increasing the number of days and amount of time, is the best way to build endurance,',
				questionId: 11,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				body: 'Buy a heart rate monitor," Lovitt says. "Exercise doesnt need to be such an all-or-nothing commitment. If you havent exercised before, or youve tried an exercise program in the past and been unable to stick with it, its important not to set unrealistic goals. Start with an activity you feel comfortable doing, go at your own pace and keep your expectations realistic',
				questionId: 12,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				body: "If you can't shell out for a trainer, Tinney suggests joining a morning boot camp or enlisting a friend for a scheduled workout date. I find when you have someone waiting for you, its much harder to hit the snooze button or skip the class",
				questionId: 13,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				body: "General rule of thumb is to leave 3 days between body parts for weights, and 24 hours for cardio.",
				questionId: 14,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				body: "When training with a personal trainer, a person is being pushed beyond their perceived limits. Sometimes those limits are real ones, and the reason.If a client has fully disclosed their medications, a personal trainer can then know which exercises to avoid due to the limitations that drug imposes on their body.",
				questionId: 15,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				body: "Very Important. You can't out train a bad diet.",
				questionId: 16,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				body: "Yes! Exercise releases endorphins, which will calm you down. It is also best to channel that stress into something productive like exercise than to unleash it on your spouse, kids, dog or self.",
				questionId: 17,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				body: "Yes, natural, functional movements are safe and encouraged for obese people. The only thing to keep in mind for an obese person is that their organs are being crushed by their visceral fat, so have to work harder, therefore intensity must be managed to prevent organ trauma.",
				questionId: 18,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				body: "Body type and levels of testosterone determine how a person will respond to weights. 99% of women will respond to weights in a feminine way. i.e. they will tone up and harden up, not bulk up. Unless they are taking steroids, a person will only reach their genetic potential, and for most women, that is an athletic looking body that will definitely turn heads for how sexy she is, not how manly she is.",
				questionId: 19,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				body: "Yes, there are many factors but the main two are predisposition to stress, and metabolism.",
				questionId: 20,
				authorId: randomNum(),
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		];


		return queryInterface.bulkInsert('Answers', answers, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Answers', null, {});
	},
};

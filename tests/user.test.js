const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setUpDatabase } = require('./fixtures/db');

beforeEach(setUpDatabase);

test('Should signup a new user', async () => {
	const response = await request(app)
		.post('/users')
		.send({
			name: 'Jainam',
			email: 'jainam@example.com',
			password: 'jainamisbest',
		})
		.expect(201);

	// Assertion that the database was changed correctly
	const user = await User.findById(response.body.user._id);
	expect(user).not.toBeNull();

	// Assertion about the response
	expect(response.body).toMatchObject({
		user: {
			name: 'Jainam',
			email: 'jainam@example.com',
		},
		token: user.token,
	});

	// Assertion that the password is hashed before saving
	expect(user.password).not.toBe('jainamisbest');
});

test('Should login existing user', async () => {
	const response = await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: userOne.password,
		})
		.expect(200);

	// Assertion that new token is saved upon login
	const user = await User.findById(response.body.user._id);
	expect(user.token).toBe(response.body.token);
});

test('Should not login non-existent user', async () => {
	await request(app)
		.post('/users/login')
		.send({
			email: 'idontexist@example.com',
			password: 'mypassworddoesntmatter',
		})
		.expect(400);
});

test('Should get profile for authenticated user', async () => {
	await request(app)
		.get('/users/me')
		.set('Authorization', `Bearer ${userOne.token}`)
		.send()
		.expect(200);
});

test('Should not get user profile unauthenticated user', async () => {
	await request(app).get('/users/me').send().expect(401);
});

test('Should delete account for authenticated user', async () => {
	await request(app)
		.delete('/users/me')
		.set('Authorization', `Bearer ${userOne.token}`)
		.send()
		.expect(200);

	// Assertion that user is removed
	const user = await User.findById(userOneId);
	expect(user).toBeNull();
});

test('Should not delete account for unauthenticated user', async () => {
	await request(app).delete('/users/me').send().expect(401);
});

test('Should upload avatar image', async () => {
	await request(app)
		.post('/users/me/avatar')
		.set('Authorization', `Bearer ${userOne.token}`)
		.attach('avatar', 'tests/fixtures/profile-pic.jpg')
		.expect(200);

	// Assertion that avatar is stored as buffer
	const user = await User.findById(userOneId);
	expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.token}`)
		.send({
			name: 'NotMike',
		})
		.expect(200);

	// Assertion that the name is changed
	const user = await User.findById(userOneId);
	expect(user.name).toBe('NotMike');
});

test('Should not update invalid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.token}`)
		.send({
			location: 'Paris',
		})
		.expect(400);
});

test('Should not signup user with invalid name', async () => {
	await request(app)
		.post('/users')
		.send({
			name: '',
			email: 'jainam@example.com',
			password: 'jainamisbest',
		})
		.expect(400);
});

test('Should not signup user with invalid email', async () => {
	await request(app)
		.post('/users')
		.send({
			name: 'Jainam',
			email: '@example.com',
			password: 'jainamisbest',
		})
		.expect(400);
});

test('Should not signup user with invalid password', async () => {
	await request(app)
		.post('/users')
		.send({
			name: 'Jainam',
			email: 'jainam@example.com',
			password: 'password',
		})
		.expect(400);
});

test('Should not update invalid user name', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.token}`)
		.send({
			name: '',
		})
		.expect(400);

	// Assertion that the name is unchanged
	const user = await User.findById(userOneId);
	expect(user.name).toBe('Mike');
});

test('Should not update invalid user email', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.token}`)
		.send({
			email: 'example.com',
		})
		.expect(400);

	// Assertion that the email is unchanged
	const user = await User.findById(userOneId);
	expect(user.email).toBe('mike@example.com');
});

test('Should not update invalid user password', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.token}`)
		.send({
			password: 'password',
		})
		.expect(400);
});

test('Should not update user if unauthenticated', async () => {
	await request(app)
		.patch('/users/me')
		.send({
			name: 'NotMike',
		})
		.expect(401);

	// Assertion that DB is unaffected
	const user = await User.findById(userOneId);
	expect(user.name).toBe('Mike');
});

test('Should not delete user if unauthenticated', async () => {
	await request(app).delete('/users/me').send().expect(401);

	// Assertion that DB is unaffected
	const user = await User.findById(userOneId);
	expect(user).not.toBeNull();
});

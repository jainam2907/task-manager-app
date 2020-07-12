const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');

const {
	userOneId,
	userOne,
	userTwoId,
	userTwo,
	taskOne,
	taskTwo,
	taskThree,
	setUpDatabase,
} = require('./fixtures/db');

beforeEach(setUpDatabase);

test('Should create task for user', async () => {
	const response = await request(app)
		.post('/tasks')
		.set('Authorization', `Bearer ${userOne.token}`)
		.send({ description: 'From my test' })
		.expect(201);

	// Assertion that the database was changed correctly
	const task = await Task.findById(response.body._id);
	expect(task).not.toBeNull();

	// Assertion that completed property is set to false as default
	expect(task.completed).toEqual(false);
});

test('Should get tasks for user', async () => {
	const response = await request(app)
		.get('/tasks')
		.set('Authorization', `Bearer ${userOne.token}`)
		.send()
		.expect(200);

	// Assertion that response contains both the tasks owned by userOne
	expect(response.body.length).toBe(2);
});

test('Should not delete tasks owned by others', async () => {
	await request(app)
		.delete(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userTwo.token}`)
		.send()
		.expect(404);

	// Assertion that task is still in database
	const task = await Task.findById(taskOne._id);
	expect(task).not.toBeNull();
});

test('Should not create task with invalid description', async () => {
	await request(app)
		.post('/tasks')
		.set('Authorization', `Bearer ${userOne.token}`)
		.send({
			description: '',
			completed: false,
		})
		.expect(400);
});

test('Should not create task with invalid completed value', async () => {
	await request(app)
		.post('/tasks')
		.set('Authorization', `Bearer ${userOne.token}`)
		.send({
			description: 'Task for testing',
			completed: 'No',
		})
		.expect(400);
});

test('Should not update task with invalid description', async () => {
	await request(app)
		.patch(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userOne.token}`)
		.send({
			description: '',
		})
		.expect(400);

	// Assertion that description remains unchanged
	const task = await Task.findById(taskOne._id);
	expect(task.description).toBe('First Task');
});

test('Should not update task with invalid completed value', async () => {
	await request(app)
		.patch(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userOne.token}`)
		.send({
			completed: 'No',
		})
		.expect(400);

	// Assertion that completed value remains unchanged
	const task = await Task.findById(taskOne._id);
	expect(task.completed).toBe(false);
});

test('Should delete user task', async () => {
	await request(app)
		.delete(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userOne.token}`)
		.send()
		.expect(200);

	// Assertion that task was deleted
	const task = await Task.findById(taskOne._id);
	expect(task).toBeNull();
});

test('Should not delete task if unauthenticated', async () => {
	await request(app).delete(`/tasks/${taskOne._id}`).send().expect(401);

	// Assertion that task was not deleted
	const task = await Task.findById(taskOne._id);
	expect(task).not.toBeNull();
});

test('Should not update tasks owned by others', async () => {
	await request(app)
		.patch(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userTwo.token}`)
		.send({
			description: 'Anything',
		})
		.expect(404);

	// Assertion that task is still in database
	const task = await Task.findById(taskOne._id);
	expect(task.description).toBe('First Task');
});

test('Should fetch user task by id', async () => {
	await request(app)
		.get(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userOne.token}`)
		.send()
		.expect(200);
});

test('Should not fetch user task by id if unauthenticated', async () => {
	await request(app).get(`/tasks/${taskOne._id}`).send().expect(401);
});

test('Should not fetch other users task by id', async () => {
	await request(app)
		.get(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userTwo.token}`)
		.send()
		.expect(404);
});

test('Should fetch only completed tasks', async () => {
	const response = await request(app)
		.get('/tasks?completed=true')
		.set('Authorization', `Bearer ${userOne.token}`)
		.send()
		.expect(200);

	// Assertion that only completed tasks are fetched
	response.body.forEach((task) => {
		expect(task.completed).toBe(true);
	});
});

test('Should fetch only incomplete tasks', async () => {
	const response = await request(app)
		.get('/tasks?completed=false')
		.set('Authorization', `Bearer ${userOne.token}`)
		.send()
		.expect(200);

	// Assertion that only incomplete tasks are fetched
	response.body.forEach((task) => {
		expect(task.completed).toBe(false);
	});
});

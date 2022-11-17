const communication = require('./communication/moodleCommunication');
const { User, Task } = require('./../database/models');
const { Op } = require("sequelize");

async function addUsers(studentMoodleUsers, appUserMoodleIds) {
    var usersToAdd = studentMoodleUsers.filter((f) => !appUserMoodleIds.has(f.id)).map((m) => new Object({
        idMoodle: m.id,
        name: m.fullname,
        email: m.email,
        username: m.username,
        password: '$2a$08$VIQ3FxNZe6MQlMzihDWcuO6xONx4oLYayUbVV9mM8j/q9ceIm7O1W'//teste
    }));

    if (usersToAdd.length > 0) {
        console.log(`Users added: ${usersToAdd.map((m) => m.username).filter((f) => f)}`);
        await User.bulkCreate(usersToAdd);
    }
    else {
        console.log("Users added:");
    }
}

async function removeUsers(studentMoodleUsers, appUserMoodleIds) {
    if (appUserMoodleIds.size == 0) return;

    var studentMoodleUserIds = studentMoodleUsers.map((m) => m.id);
    var usersToRemove = [...appUserMoodleIds].filter((f) => !studentMoodleUserIds.includes(f));

    if (usersToRemove.length > 0) {
        console.log(`Users deleted (idMoodle): ${usersToRemove}`);
        await User.destroy({
            where: {
                idmoodle: usersToRemove
            }
        });
    }
    else {
        console.log("Users deleted (idMoodle):");
    }
}

async function syncUsers() {
    try {
        var moodleUsers = await communication.getUsers();
        var appUsers = await User.findAll();

        var studentMoodleUsers = moodleUsers.users.filter((f) => f.id > 2);
        var appUserMoodleIds = new Set(appUsers.map((u) => u.dataValues.idMoodle).filter((f) => f != null));

        addUsers(studentMoodleUsers, appUserMoodleIds);
        removeUsers(studentMoodleUsers, appUserMoodleIds);
    } catch (error) {
        console.log(error);
    }
}

async function addTasks(moodleUserId, quizzes, assignments) {
    var tasksToAdd = [];
    var descriptionLimit = 100;

    quizzes.forEach(quiz => {
        var description = assignments.intro != null ? `${quiz.intro.substring(0, descriptionLimit)}${quiz.intro.length > descriptionLimit ? '...' : ''}` : null;
        var start_date = quiz.timeopen > 0 ? new Date(quiz.timeopen) : new Date(quiz.timecreated);
        var deadline = quiz.timeclose > 0 ? new Date(quiz.timeclose) : null;
        var duration = deadline != null ? deadline.getTime() - start_date.getTime() : null

        tasksToAdd[tasksToAdd.length] = new Object({
            idMoodle: quiz.id,
            name: quiz.name,
            description: description,
            start_date: start_date,
            deadline: deadline,
            complexity: 'mediano',
            duration: duration,
            type: 'trabalho',
            situation: 'pendente',
            id_user: moodleUserId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
    assignments.forEach((assignment) => {
        var description = assignment.intro != null ? `${assignment.intro.substring(0, descriptionLimit)}${assignment.intro.length > descriptionLimit ? '...' : ''}` : null;
        var start_date = new Date(assignment.timemodified);
        var deadline = assignment.duedate > 0 ? new Date(assignment.duedate) : null;
        var duration = deadline != null ? deadline.getTime() - start_date.getTime() : null

        tasksToAdd[tasksToAdd.length] = new Object({
            idMoodle: assignment.id,
            name: assignment.name,
            description: description,
            start_date: start_date,
            deadline: deadline,
            complexity: 'mediano',
            duration: duration,
            type: 'atividade',
            situation: 'pendente',
            id_user: moodleUserId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });

    if (tasksToAdd.length > 0) {
        await Task.bulkCreate(tasksToAdd);
    }
}

async function syncTasks() {
    try {
        var moodleUsers = await communication.getUsers();
        var appTasks = await Task.findAll({
            where:{
                [Op.not]: {
                    idMoodle: null
                }
            }
        });

        var moodleQuizIds = appTasks.filter((f) => f.type == 'trabalho').map((m) => m.idMoodle);
        var moodleAssignmentIds = appTasks.filter((f) => f.type == 'atividade').map((m) => m.idMoodle);
    
        moodleUsers.users
            .filter((f) => f.id > 2)
            .forEach(async (moodleUser) => {
            var userCourses = await communication.getUserCourses(moodleUser.id);

            var userCourseIds = userCourses.map((m) => m.id);

            var courseQuizzes = await communication.getCourseQuizzes(userCourseIds);
            var courseAssignments = await communication.getCourseAssignments(userCourseIds);

            await addTasks(
                moodleUser.id,
                new Set(courseQuizzes.quizzes
                    .filter((f) => !moodleQuizIds.includes(f.id))),
                new Set(courseAssignments.courses
                    .filter((f) => f.assignments.length > 0)
                    .flatMap((m) => m.assignments.filter((f) => !moodleAssignmentIds.includes(f.id)))),
                appTasks
            );
        });
    } catch (error) {
        console.log(error);
    }
}

function syncMoodle(box_type) {
    var args = process.argv.slice(2);
    var box_type = args[0];

    switch (box_type) {
        case 'sync_users':
            syncUsers();
            break;
        case 'sync_tasks':
            syncTasks()
            break;
        default:
            console.log("necessário inserir argumento para box_type")
            break;
    }
}

function main() {
    try {
        communication.init('http://stdm_moodle:8080/', '021a6f0879fd6ab99272493902be7e6b');
        // communication.init('http://localhost/', '021a6f0879fd6ab99272493902be7e6b');

        communication.getSiteInfo();

        syncMoodle()
    }
	catch (err) {
	  console.log(err);
	}
}

main();
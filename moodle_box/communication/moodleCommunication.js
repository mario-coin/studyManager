const moodle_client = require("moodle-client");

var init;

module.exports = {
    init: function (wwwroot, token) {
        init = moodle_client.init({
                wwwroot: wwwroot,
                token: token
            });
    },
    getSiteInfo: function () {
        return init
        .then((client) => {
            client.call({
                wsfunction: "core_webservice_get_site_info",
        
            }).then(function(info) {
                console.log("Hello %s, welcome to %s", info.fullname, info.sitename);
                return;
            });
        })
        .catch((err) => {
            console.log(err)
        });
    },
    getUsers: function () {
        return new Promise((resolve) => {
            init
            .then((client) => {
                return client.call({
                    wsfunction: "core_user_get_users",
                    method: "POST",
                    args: {
                        criteria: [
                            {key: 'auth', value: 'manual'},
                        ]
                    }
                })
                .then((users) => {
                    resolve(users);
                });
            });
        })
        .catch((err) => {
            console.log(err)
        });
    },
    getUserCourses: function (userid) {
        return new Promise((resolve) => {
            init
            .then((client) => {
                client.call({
                    wsfunction: "core_enrol_get_users_courses",
                    method: "POST",
                    args: {
                        userid: userid
                    }
                }).then(function(courses) {
                    resolve(courses);
                });
            });
        })
        .catch((err) => {
            console.log(err)
        });
    },
    getCourseQuizzes: function (courseids) {
        return new Promise((resolve) => {
            init
            .then((client) => {
                client.call({
                    wsfunction: "mod_quiz_get_quizzes_by_courses",
                    method: "POST",
                    args: {
                        courseids: courseids
                    }
                }).then(function(courses) {
                    resolve(courses);
                });
            });
        })
        .catch((err) => {
            console.log(err)
        });
    },
    getCourseAssignments: function (courseids) {
        return new Promise((resolve) => {
            init
            .then((client) => {
                client.call({
                    wsfunction: "mod_assign_get_assignments",
                    method: "POST",
                    args: {
                        courseids: courseids
                    }
                }).then(function(courses) {
                    resolve(courses);
                });
            });
        })
        .catch((err) => {
            console.log(err)
        });
    },
}
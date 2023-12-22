"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = __importDefault(require("./utils/sequelize"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
require("./model/User");
const app = (0, express_1.default)();
sequelize_1.default.sync({ alter: true })
    .then(() => {
    console.log('connected to the database');
});
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express_1.default.static(path_1.default.join(__dirname, "..", 'public')));
//other middleware
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Routes
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const quizRoutes_1 = __importDefault(require("./routes/quizRoutes"));
const signup_1 = __importDefault(require("./routes/signup"));
const login_1 = __importDefault(require("./routes/login"));
const profile_1 = __importDefault(require("./routes/profile"));
const quizTaking_1 = __importDefault(require("./routes/quizTaking"));
const admin_1 = __importDefault(require("./routes/admin"));
//use your routes
app.use('/', index_1.default);
app.use('/users', users_1.default);
app.use('/quizRoutes', quizRoutes_1.default);
app.use('/', signup_1.default);
app.use('/', login_1.default);
app.use('/', profile_1.default);
app.use('/', quizTaking_1.default);
app.use('/', admin_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv=require('dotenv');
var session=require('express-session');

var indexRouter = require('./routes/index');

var nosotrosRouter = require('./routes/nosotros');
var modelosRouter = require('./routes/modelos');
var tallerRouter = require('./routes/taller');
var contactoRouter = require('./routes/contacto');
var usuarioRouter = require('./routes/usuario');


var app = express();

//dotenv reader
dotenv.config();

//mysql config

var pool=require('./models/bd');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname+'/public/images/'));
app.use(express.static(__dirname+'/public/javascripts/'));
app.use(express.static(__dirname+'/public/stylesheets/'));

app.use(session({
  secret:'asdfsdfsdfsdfASDFASDF1231231231',
  resave:false,
  saveUninitialized:true
}));

app.get('/salir',function(req,res){
  req.session.destroy();  
  res.redirect('/taller');
})




app.use('/', indexRouter);
app.use('/nosotros', nosotrosRouter);
app.use('/modelos', modelosRouter);
app.use('/taller', tallerRouter);
app.use('/contacto', contactoRouter);
app.use('/usuario', usuarioRouter);

////////funciones disponibles////////
/////select insert update delete/////
mysql('select','empleados');




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



function mysql(selector,tabla){
  switch (selector){
    case 'select':
      pool.query("select * from "+tabla).then(function(resultados){
        console.log(resultados);
      });
      break;
    case 'insert':
      var obj={
        nombre:'Juan',
        apellido:'Lopez',
        trabajo:'Ejecutivo de ventas',
        edad:30,
        salario:90000,
        mail:'juanlopez@bignet.com'
      }
      pool.query("insert into "+tabla+" set ?",[obj]).then(function(resultados){
        console.log(resultados);
      });
      break;
    case 'update':
      var id=2;
      var obj={
      nombre:'Pedro',
      apellido:'Montes'}

      pool.query("update "+tabla+" set ? where id_emp=?",[obj,id]).then(function(resultados){
        console.log(resultados);
      });
      break;
    case 'delete':
      var id=2;

      pool.query("delete from "+tabla+" where id_emp= ?",[id]).then(function(resultados){
      console.log(resultados);
      });
      break;
    default:
      console.log('Funcion no encontrada');

  }

}


module.exports = app;

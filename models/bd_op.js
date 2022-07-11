var pool=require('./bd');
//select
pool.query("select * from alumnos").then(function(resultados){
    console.log(resultados);
});

//insert
var obj={
    nombre:'juan',
    apellido:'lopez'
}
pool.query("insert into alumnos set ?",[obj]).then(function(resultados){
    console.log(resultados);
});

//update

var id=2;
var obj={
    nombre:'pedro',
    apellido:'montes'
}

pool.query("update alumnos set ? qhere id=?",[obj,id]).then(function(resultados){
    console.log(resultados);
});

//delete

var id=2;

pool.query("delete from alumnos where id= ?",[id]).then(function(resultados){
    console.log(resultados);
});
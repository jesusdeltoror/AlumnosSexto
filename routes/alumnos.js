var express = require('express');
var router = express.Router();
var { MongoClient, url, dbName } = require('../config/conexion');
var assert = require('assert');
var helpers = require('../helper/helpers.js')


router.get('/', function (req, res, next) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        assert.equal(null, err);
        console.log('Conexion con la DB exitosa : Busqueda');

        const db = client.db(dbName);
        db.collection('Alumnos').find().toArray(function (err, docs) {
            res.render('alumnos', { Alum: docs })
        })


        client.close();
    });

router.post('/insert', function (req, res, next) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        assert.equal(null, err);
        console.log('Conexion con la DB exitosa : Busqueda');
        const db = client.db(dbName);
        db.collection('count').findOne({_id:"1"})
        .then((docs)=>{
            let id = +docs.alumnos+1;
            const client = new MongoClient(url);
            client.connect(function (err) {
                assert.equal(null, err);
                console.log('Conexion con la DB exitosa : Insert');
                const db = client.db(dbName);
                    db.collection('Alumnos').insertOne(
                        {   
                            "_id": id,
                            "matricula": req.body.matricula,
                            "nombre": req.body.nombre,
                            "p1": parseFloat(req.body.p1),
                            "p2": parseFloat(req.body.p2),
                            "p3": parseFloat(req.body.p3),
                            "p4": parseFloat(req.body.p4),
                            "examen": parseFloat(req.body.examen),
                            "calificacion": parseFloat(req.body.p1)+parseFloat(req.body.p2)+parseFloat(req.body.p3)+parseFloat(req.body.p4)+parseFloat(req.body.examen)
                        }
                    ).then(()=>{
                            const client = new MongoClient(url);
                            client.connect(function (err) {
                                assert.equal(null, err);
                                console.log('Conexion con la DB exitosa : Insert count');
                                const db = client.db(dbName);
                                    db.collection('count').updateOne(
                                        {
                                            "_id":"1"
                                        },
                                        {$set:  {
                                                    "alumnos":id
                                                }
                                        }, 
                                        { 
                                            upsert: false 
                                        } 
                                    )
                                    
                            })
                    })
            })
            client.close();
            client.close();
            client.close();
        })
        
        
        

        res.redirect('/alumnos6');
        client.close();
        });
    })
})

router.post('/update', function (req, res, next) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        assert.equal(null, err);
        console.log('Conexion con la DB exitosa : update');
        const db = client.db(dbName);
        db.collection('Alumnos').updateOne(
            { 
                "_id": +req.body._id 
            },
            {$set:  {
                        "matricula": req.body.matricula,
                        "nombre": req.body.nombre,
                        "p1": req.body.p1,
                        "p2": req.body.p2,
                        "p3": req.body.p3,
                        "p4": req.body.p4,
                        "examen": req.body.examen,
                        "calificacion": parseFloat(req.body.p1)+parseFloat(req.body.p2)+parseFloat(req.body.p3)+parseFloat(req.body.p4)+parseFloat(req.body.examen)
                    }
            },
            { 
                upsert: false 
            } 
        );

        res.redirect('/alumnos6')
        client.close();
    });
});

router.get('/delete/:_id', function (req, res, next) {
    const client = new MongoClient(url);
    client.connect(function (err) {
        assert.equal(null, err);
        console.log('Conexion con la DB exitosa : Busqueda');
        const db = client.db(dbName);
        db.collection('count').findOne({_id:"1"})
        .then((docs)=>{
            let id = +docs.alumnos-1;
            const client = new MongoClient(url);
            client.connect(function (err) {
                assert.equal(null, err);
                console.log('Conexion con la DB exitosa : Insert');
                const db = client.db(dbName);
                db.collection('Alumnos').deleteOne({ "_id": +req.params._id })   
                .then(()=>{
                const client = new MongoClient(url);
                            client.connect(function (err) {
                                assert.equal(null, err);
                                console.log('Conexion con la DB exitosa : Insert count');
                                const db = client.db(dbName);
                                    db.collection('count').updateOne(
                                        {
                                            "_id":"1"
                                        },
                                        {$set:  {
                                                    "alumnos":id
                                                }
                                        }, 
                                        { 
                                            upsert: false 
                                        } 
                                    )
                                    
                            })
                    })
            })
            client.close();
            client.close();
            client.close();
        })
        
        
        

        res.redirect('/alumnos6');
        client.close();
    });
    
});

module.exports = router;
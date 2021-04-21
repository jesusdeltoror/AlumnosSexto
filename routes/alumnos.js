var express = require('express');
var router = express.Router();
var { MongoClient, url, dbName } = require('../config/conexion');
var assert = require('assert');
var helpers = require('../helper/helpers.js')
var ObjectID = require('mongodb').ObjectID;


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
});

router.post('/insert', function (req, res, next) {
    const client = new MongoClient(url);
            client.connect(function (err) {
                assert.equal(null, err);
                console.log('Conexion con la DB exitosa : Insert');
                const db = client.db(dbName);
                    db.collection('Alumnos').insertOne(
                        {   
                            "matricula": req.body.matricula,
                            "nombre": req.body.nombre,
                            "p1": parseFloat(req.body.p1),
                            "p2": parseFloat(req.body.p2),
                            "p3": parseFloat(req.body.p3),
                            "p4": parseFloat(req.body.p4),
                            "examen": parseFloat(req.body.examen),
                            "calificacion": parseFloat(req.body.p1)+parseFloat(req.body.p2)+parseFloat(req.body.p3)+parseFloat(req.body.p4)+parseFloat(req.body.examen)
                        }
                    )
            res.redirect('/alumnos6')
            client.close();
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
                "_id": ObjectID(req.body._id)
            },
            {$set:  {
                        "matricula": req.body.matricula,
                        "nombre": req.body.nombre,
                        "p1": +req.body.p1,
                        "p2": +req.body.p2,
                        "p3": +req.body.p3,
                        "p4": +req.body.p4,
                        "examen": +req.body.examen,
                        "calificacion": parseFloat(req.body.p1)+parseFloat(req.body.p2)+parseFloat(req.body.p3)+parseFloat(req.body.p4)+parseFloat(req.body.examen)
                    }
            },
            { 
                upsert: true
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
        console.log('Conexion con la DB exitosa : Insert');
        const db = client.db(dbName);
        db.collection('Alumnos').deleteOne  (
                                                { 
                                                    "_id": ObjectID(req.params._id)
                                                }
                                            )   
        .then(()=>{})
    });
    res.redirect('/alumnos6')
    client.close();
})

module.exports = router;
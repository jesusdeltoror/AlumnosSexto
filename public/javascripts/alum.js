let matricula = document.getElementById('matricula');
let nombre = document.getElementById('nombre');
let p1 = document.getElementById('p1');
let p2 = document.getElementById('p2d');
let p3 = document.getElementById('p3');
let p4 = document.getElementById('p4');
let examen = document.getElementById('examen');
let calificacion = document.getElementById('calificacion');

let u_id = document.getElementById('u_id')
let umatricula = document.getElementById('umatricula');
let unombre = document.getElementById('unombre');
let up1 = document.getElementById('up1');
let up2 = document.getElementById('up2');
let up3 = document.getElementById('up3');
let up4 = document.getElementById('up4');
let uexamen = document.getElementById('uexamen');
let ucalificacion = document.getElementById('ucalificacion');


function update(id,matricula,nom,p1,p2,p3,p4,exa){
    u_id.value=id;
    umatricula.value=matricula;
    unombre.value=nom;
    up1.value=p1;
    up2.value=p2;
    up3.value=p3;
    up4.value=p4;
    uexamen.value=exa;
    ucalificacion.value=parseFloat(p1)+parseFloat(p2)+parseFloat(p3)+parseFloat(p4)+parseFloat(exa);
}

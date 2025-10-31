// Importar Express.js const express = require ( 'express' );


// Crea una aplicación Express const app = express ();


// Middleware para analizar cuerpos JSON app.use 
( express.json ( ));

// Establecer puerto y token de verificación const puerto = process.env.PORT || 3000 ; const tokenDeVerificación = process.env.VERIFY_TOKEN ;​​
 


// Ruta para solicitudes GET 
app.get ( '/' , ( req , res ) => { const { 'hub.mode' : mode , ' hub.challenge' : challenge , ' hub.verify_token' : token } = req.query ;   
       

  if ( mode === 'subscribe' && token === verifyToken ) { 
    console . log ( 'WEBHOOK VERIFIED' ); 
    res . status ( 200 ). send ( challenge ); } else { 
    res . status ( 403 ). end (); } });    
    
  


// Ruta para solicitudes POST app.post 
( ' /' , ( req , res ) => { const timestamp = new Date (). toISOString ( ) . replace ( 'T' , ' ' ) .slice ( 0 , 19 ); console.log 
  ( ` \ n\n Webhook recibido $ { timestamp } \n` ) ; 
  console.log ( JSON.stringify ( req.body , null , 2 ) ) ; 
  res.status ( 200 ) .end ( ) ; } ) ;   
        


// Iniciar el servidor 
app.listen ( port , () => { 
  console.log ( ` \ nEscuchando en el puerto $ { port } \ n` ); }) ;   
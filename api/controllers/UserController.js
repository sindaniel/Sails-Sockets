/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  admin: function(req, res, next){
    res.view();
  },
	test: function(req, res, next){

	
		
        var send = req.param('send');
        var message = req.param('message');
        var socketId;


User.findOne({id: 1}).exec(function(err, userInstance) {
  console.log(userInstance)
});


        if (send && req.isSocket){

          // User.update(1,{name:'Heisenberg'}).exec(function update(err,updated){
          // 	console.log(updated)
          //   User.publishUpdate(2,{ name:'daniel' });
          // });

        if(send == 1){
          console.log('entro auqi y manda '+message)
          sails.sockets.emit(message, 'privateMessage', {from: req.session.userId, msg: 'Hi!'});
          //User.publishUpdate(message,"hola");
        }


 User.findOne(1).exec(function(e,userOne){
              // Get all of the sockets that are subscribed to user #1

            
                var subscribers = User.subscribers(userOne);
            
             _.each(subscribers, function(subscriber) {
                 User.publishUpdate(1,{id:subscriber.id});
                 sails.sockets.emit(subscriber.id, 'privateMessage', {id:subscriber.id});
              });



              // Subscribe them all to userOne's best friend, too
            
          });



       // User.publishUpdate(1,"hola");

    //       User.create({name:nameSent})
				//     .exec(function(error,data_from_client){
				// 	console.log(data_from_client);

          

				// }); 



        } else if (req.isSocket){

        User.find({}).exec(function(e,listOfUsers){
          User.subscribe(req.socket,listOfUsers);
        console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'users\'.');
         

        });
     
        } else{
   
        res.view();






      }
	},
  listSockets: function(req, res, next){



        User.findOne(1).exec(function(e,userOne){
              // Get all of the sockets that are subscribed to user #1

            
                var subscribers = User.subscribers(userOne);
                var sockets =[];
             _.each(subscribers, function(subscriber) {
                 //User.publishUpdate(1,{id:subscriber.id});
                 console.log(subscriber.id)
                  sockets.push(subscriber.id)
                  console.log(sockets)
              });

             User.publishUpdate(1,{sockets:sockets});




              // Subscribe them all to userOne's best friend, too
            
          });
  },
  setScreen: function(req, res, next){


        var id = req.param('id');
        var color = req.param('color');
        console.log(req.param('color'));
        sails.sockets.emit(id, 'setColor', color);


  }
};


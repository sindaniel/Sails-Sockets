/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	test: function(req, res, next){

	
		
        var nameSent = req.param('name');

        if (nameSent && req.isSocket){

          // User.update(1,{name:'Heisenberg'}).exec(function update(err,updated){
          // 	console.log(updated)
          //   User.publishUpdate(2,{ name:'daniel' });
          // });


      


          User.create({name:nameSent})
				.exec(function(error,data_from_client){
					console.log(data_from_client);

          console.log(User.subscribers(userOne));
					User.publishUpdate(2,data_from_client);
				}); 



        } else if (req.isSocket){

        User.find({}).exec(function(e,listOfUsers){
          User.subscribe(req.socket,listOfUsers);
        console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'users\'.');
        });

        } else {

          res.view();

        }
	}
};


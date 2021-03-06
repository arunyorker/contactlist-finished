var express=require("express"),
	app=express(),
	mongojs=require("mongojs"),
	db=mongojs("contactlist",["contactlist"]),
	bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get("/contactList",function(request,response) {
	console.log("I recieved the get request");
	// person1 = {
	// 	name : "Pranav",
	// 	email : "pranavbgab@gmail.com",
	// 	number : "111-111-1111"
	// };
	// person2 = {
	// 	name : "Anoop",
	// 	email : "Anoop@gmail.com",
	// 	number : "222-222-2222"
	// };
	// person3 = {
	// 	name : "Raja Kandhaswamy",
	// 	email : "rajakandhaswamy@gmail.com",
	// 	number : "333-333-3333"
	// };

	// var contactList = [person1,person2,person3];
	// response.json(contactList);

	db.contactlist.find(function(err,data) {
		console.log(data);
		response.json(data);
	});
});
app.post("/contactList" , function(req , res) {
	console.log(req.body);
	db.contactlist.insert(req.body, function(err , data) {
		res.json(data);
	})
})
app.delete("/contactList/:id" , function(req , res) {
	var id= req.params.id;
	console.log(id);
	db.contactlist.remove({_id : mongojs.ObjectId(id)} , function(err ,data) {
		res.json(data);
	})
});


app.get('/contactList/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({
        _id: mongojs.ObjectId(id)
    }, function(err, docs) {
        res.json(docs);
    });
}); 

app.put("/contactList/:id" , function(req , res) {
	var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({query : {_id : mongojs.ObjectId(id)},
		update : {$set : {name : req.body.name , email : req.body.name , number : req.body.number}},
		new : true} ,function(err,data) {
			res.json(data);
		}
	);
});

app.listen(3000,function() {
	console.log("Server running on port 3000");
})
var express = require("express");
const crypto = require('crypto');
const bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/',(req,res) => {
	console.log(req.body.input);
	const a= req.body.input;
	const target="0000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
	if(a===undefined){
		res.send("input field is not present");
	} 
	else{
		var i=0;
		var required_hash="";
		for(i=0;;i++)
		{
			var temp=a+i;
			const hash = crypto.createHash('sha256').update(temp).digest('hex');
			if(hash<target)
			{
				required_hash=hash;
				break;
			}
		}
		res.send({'integer':i,"hash":required_hash})
	}
})

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
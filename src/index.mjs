import express, { request, response } from "express";

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 3000;

const mockUsers = [
    { id:1, username: "anson", displayName: "ANSON"},
    { id:2, username: "jayce", displayName: "JAYCE"},
    { id:3, username: "roselina", displayName: "ROSELINA"}
];

app.get('/',(request,response)=>{
    response.status(201).send({msg:"Hello"});
});

app.get('/api/users',(request,response)=>{
    response.send(mockUsers);
});

app.get('/api/users/:id',(request,response)=>{
    console.log(request.params);

    const parseId = parseInt(request.params.id);

    if(isNaN(parseId)) 
        return response.status(400).send({msg:"Bad Request"});

    const findUsers = mockUsers.find((user)=>{
        return user.id === parseId;
    });

    if(!findUsers) return response.sendStatus(404);

    return response.send(findUsers);
});

app.get('/api/products', (request, response)=>{
    response.send([{id:123, name: "chicken breast", price: 12.99}]);
});

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});
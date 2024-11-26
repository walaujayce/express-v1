import express, { request, response } from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});

const mockUsers = [
    { id:1, username: "anson", displayName: "ANSON"},
    { id:2, username: "jayce", displayName: "JAYCE"},
    { id:3, username: "roselina", displayName: "ROSELINA"}
];

// GET API
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

// POST API

app.post('/api/users',(request,response)=>{
    console.log(request.body);
    const {body} = request;
    const newUsers = {id:mockUsers[mockUsers.length-1].id+1, ...body};
    mockUsers.push(newUsers);
    return response.status(201).send(newUsers);
});

// PUT API

app.put('/api/users/:id', (request, response)=>{
    const { body, params : {id}} = request;
    const parseId = parseInt(id);
    if(isNaN(parseId)) return response.sendStatus(400);

    const findUsersIndex = mockUsers.findIndex(
        (user) => user.id === parseId
    );

    if(findUsersIndex === -1) return response.sendStatus(404);

    mockUsers[findUsersIndex] = { id: parseId, ...body };

    return response.sendStatus(200);

});

// PATCH API

app.patch('/api/users/:id', (request, response)=>{
    const { body, params : {id}} = request;
    const parseId = parseInt(id);
    if(isNaN(parseId)) return response.sendStatus(400);

    const findUsersIndex = mockUsers.findIndex(
        (user) => user.id === parseId
    );

    if(findUsersIndex === -1) return response.sendStatus(404);

    mockUsers[findUsersIndex] = { ...mockUsers[findUsersIndex], ...body };

    return response.sendStatus(200);

});

// PATCH API

app.delete('/api/users/:id',(request, response)=>{
    const {params:{id}} = request;

    const parseId = parseInt(id);

    if(isNaN(parseId)) return response.sendStatus(400);

    const findUsersIndex = mockUsers.findIndex((user)=> user.id === parseId);

    if(findUsersIndex === -1) return response.sendStatus(404);

    mockUsers.splice(findUsersIndex,1);

    return response.sendStatus(200);
});
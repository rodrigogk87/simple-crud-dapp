pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Crud{

    struct User{
        uint id;
        string name;
    }

    User[] public users;
    uint public nextId;

    function create(string memory name) public{
        users.push(User(nextId, name));
        nextId++;
    }

    function read(uint id) view public returns(User memory){
        uint index = findIndex(id);
        return users[index];
    }
    
    function getUsers() view public returns(User[] memory){
        return users;
    }

    function update(uint id, string memory name) public{
        uint index = findIndex(id);
        users[index].name = name;
        
    }

    function findIndex(uint id) view internal returns(uint){
       for(uint i=0;i<users.length;i++){
            if(users[i].id == id){
                return i;
            } 
        }
        revert("User does not exist");
    }
    
    function destroy(uint id) public{
        uint index = findIndex(id);
        delete users[index];
        if (id >= users.length) return;
        for (uint i=id; i < users.length-1; i++) {
          users[i] = users[i+1];
        }
        users.length--;
    }


}
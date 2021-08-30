import { useState } from 'react';
export default function Admin(){

    var userList = [
        {
            "name":"Tiger Nixon",
            "position":"System Architect",
            "office":"Edinburgh",
            "age":"61",
            "startData":"2011/04/25",
            "salary":"$320,800"
        },
        {
            "name":"Garrett Winters",
            "position":"Accountant",
            "office":"Tokyo",
            "age":"63",
            "startData":"2011/07/25",
            "salary":"$320,340"
        },
        {
            "name":"Ashton Cox",
            "position":"Junior Technical Author",
            "office":"Tokyo",
            "age":"63",
            "startData":"2011/07/25",
            "salary":"$320,340"
        },
        {
            "name":"Cedric Kelly",
            "position":"Senior Javascript Developer",
            "office":"Edinburgh",
            "age":"63",
            "startData":"2011/07/25",
            "salary":"$34454545"
        }
    ];

    var [users ,setUsers] = useState(userList);
    function searchUser(event){
        var SearchedUsers =   userList.filter((user)=>{
             return user.name.toLowerCase().includes(event.target.value.toLowerCase()) ||  user.position.toLowerCase().includes(event.target.value.toLowerCase()) || user.office.toLowerCase().includes(event.target.value.toLowerCase());
          });
          console.log(SearchedUsers);
          setUsers(SearchedUsers);
      }
    return (
        
       <div className="container">
        <div>
            <h1>User List</h1>
        </div>
        <div className="form-outline">
                <input type="search" onChange={searchUser} id="form1" className="form-control" placeholder="Type query"
                aria-label="Search" />
        </div>
        <br />
        <table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
  <thead>
    <tr>
      <th className="th-sm">Name
      </th>
      <th className="th-sm">Position
      </th>
      <th className="th-sm">Office
      </th>
      <th className="th-sm">Age
      </th>
      <th className="th-sm">Start date
      </th>
      <th className="th-sm">Salary
      </th>
    </tr>
  </thead>
  <tbody>
      {users.map((user,index)=>{
          return (<tr key={index}>
          <td>{user.name}</td>
          <td>{user.position}</td>
          <td>{user.office}</td>
          <td>{user.age}</td>
          <td>{user.startDate}</td>
          <td>{user.salary}</td>
        </tr>)
      })}
  </tbody>
  <tfoot>
    <tr>
      <th>Name
      </th>
      <th>Position
      </th>
      <th>Office
      </th>
      <th>Age
      </th>
      <th>Start date
      </th>
      <th>Salary
      </th>
    </tr>
  </tfoot>
</table>
</div>
    )
}
import { useQuery, gql } from '@apollo/client';

const query = gql`
  query GetTodoWithUser {
    getTodo {
      title,
      completed
      user {
        name,
        username,
        email
      }
    }  
  }
`

function App() {

  const {loading,error,data} = useQuery(query)

  const todos = data?.getTodo || [];

  if(loading) {
    return <h1>Loading...</h1>
  }

  if(error) {
    return <p>{error.message}</p>
  }

  return (
    <div>
      <table style={{border:"1px solid black",borderCollapse: "collapse",margin:"auto",marginTop:"50px"}}>
        <tr style={{border:"1px solid black",borderCollapse: "collapse"}}>
          <th style={{border:"1px solid black",borderCollapse: "collapse"}}>Title</th>
          <th style={{border:"1px solid black",borderCollapse: "collapse"}}>Completed</th>
          <th style={{border:"1px solid black",borderCollapse: "collapse"}}>Name</th>
          <th style={{border:"1px solid black",borderCollapse: "collapse"}}>Username</th>
          <th style={{border:"1px solid black",borderCollapse: "collapse"}}>Email</th>
        </tr>
          {todos.map((t,index)=> {
             return <tr key={index}>
              <td style={{border:"1px solid black",borderCollapse: "collapse"}}>{t.title}</td>
              <td style={{border:"1px solid black",borderCollapse: "collapse"}}>{t.completed ? 'Yes': 'No'}</td>
              <td style={{border:"1px solid black",borderCollapse: "collapse"}}>{t.user.name}</td>
              <td style={{border:"1px solid black",borderCollapse: "collapse"}}>{t.user.username}</td>
              <td style={{border:"1px solid black",borderCollapse: "collapse"}}>{t.user.email}</td>
            </tr>
          })}
      </table>
    </div>
  );
}

export default App;

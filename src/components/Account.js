import { useQuery, gql } from '@apollo/client';

const USER_QUERY = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
    }
  }
`;

function Account({ setLoggedIn }) {
  
  const { data, loading, error } = useQuery(USER_QUERY, {
    variables: { id: 2 },  
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching account details!</p>;

  return (
    <div className="account-container">
      <h1>Account Information</h1>
      <div className="account-info">
        <p>First Name: {data?.user?.firstName || 'N/A'}</p>
        <p>Last Name: {data?.user?.lastName || 'N/A'}</p>
        <p>Email: {data?.user?.email || 'N/A'}</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Account;

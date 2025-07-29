import { Admin, Resource, Layout } from 'react-admin';
import { UserList, UserShow, UserEdit, UserCreate } from './resources/users';
import { ProfileList, ProfileShow, ProfileEdit, ProfileCreate } from './resources/profiles';
import dataProvider from './dataProvider';
import authProvider from './authProvider';


const AdminLayout = (props: any) => <Layout {...props} />;


const Dashboard = () => (
  <div style={{ padding: '20px' }}>
    <h1>Mental Health Literacy Admin</h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Users</h3>
        <p>Manage user accounts and authentication</p>
      </div>
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Profiles</h3>
        <p>Manage user profiles and onboarding status</p>
      </div>
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Resources</h3>
        <p>Manage mental health resources and content</p>
      </div>
    </div>
  </div>
);

export const AdminApp = () => (
  <Admin
    basename="/admin"
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
    layout={AdminLayout}
    title="Mental Health Literacy Admin"
  >
    <Resource
      name="users"
      list={UserList}
      show={UserShow}
      edit={UserEdit}
      create={UserCreate}
    />
    <Resource
      name="profiles"
      list={ProfileList}
      show={ProfileShow}
      edit={ProfileEdit}
      create={ProfileCreate}
    />
  </Admin>
);

export default AdminApp;
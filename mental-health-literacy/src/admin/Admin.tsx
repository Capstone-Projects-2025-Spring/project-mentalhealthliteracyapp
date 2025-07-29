import { Admin, Resource, Layout } from 'react-admin';
import { VideoList, VideoShow, VideoEdit, VideoCreate } from './resources/videos';
import { CategoryList, CategoryShow, CategoryEdit, CategoryCreate } from './resources/categories';
import dataProvider from './dataProvider';
import authProvider from './authProvider';


const AdminLayout = (props: any) => <Layout {...props} />;


const Dashboard = () => (
  <div style={{ padding: '20px' }}>
    <h1>Mental Health Literacy Admin</h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Videos</h3>
        <p>Manage video content and metadata</p>
      </div>
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Categories</h3>
        <p>Manage video categories and topics</p>
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
      name="videos"
      list={VideoList}
      show={VideoShow}
      edit={VideoEdit}
      create={VideoCreate}
    />
    <Resource
      name="categories"
      list={CategoryList}
      show={CategoryShow}
      edit={CategoryEdit}
      create={CategoryCreate}
    />
  </Admin>
);

export default AdminApp;
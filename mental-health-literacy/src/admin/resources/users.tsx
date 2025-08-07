import {
  List,
  Datagrid,
  TextField,
  DateField,
  EmailField,
  Show,
  SimpleShowLayout,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  Filter,
  SearchInput,
  BooleanField,
  BooleanInput,
  ReferenceField,
  ReferenceManyField,
  FunctionField,
} from 'react-admin';

const UserFilter = (props: any) => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn placeholder="Search by name or email" />
    <TextInput label="Display Name" source="display_name" />
    <TextInput label="Email" source="email" />
  </Filter>
);

export const UserList = () => (
  <List filters={<UserFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
    <Datagrid rowClick="show">
      <TextField source="id" label="User ID" />
      <TextField source="display_name" label="Display Name" />
      <EmailField source="email" />
      <DateField source="created_at" label="Joined" showTime />
    </Datagrid>
  </List>
);

export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" label="User ID" />
      <TextField source="display_name" label="Display Name" />
      <EmailField source="email" />
      <DateField source="created_at" label="Joined" showTime />
      
      <ReferenceManyField
        label="Selected Preferences (Art, Music, Writing, Nature, Fitness, etc.)"
        reference="userPreferences"
        target="user_id"
        sort={{ field: 'preference_id', order: 'ASC' }}
      >
        <Datagrid bulkActionButtons={false}>
          <ReferenceField source="preference_id" reference="preferences" label="Preference">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField source="preference_id" reference="preferences" label="Type">
            <TextField source="type" />
          </ReferenceField>
        </Datagrid>
      </ReferenceManyField>
      
      <ReferenceManyField
        label="Liked Videos"
        reference="userInteractions"
        target="user_id"
        filter={{ like: true }}
        sort={{ field: 'videoId', order: 'DESC' }}
      >
        <Datagrid bulkActionButtons={false}>
          <ReferenceField source="videoId" reference="videos" label="Video">
            <FunctionField render={(record: any) => 
              `${record.username || 'Unknown'} - ${record.description ? record.description.substring(0, 50) + '...' : 'No description'}`
            } />
          </ReferenceField>
          <ReferenceField source="videoId" reference="videos" label="Likes">
            <TextField source="likes" />
          </ReferenceField>
        </Datagrid>
      </ReferenceManyField>
      
      <ReferenceManyField
        label="Preferred Therapy Categories"
        reference="userPreferences"
        target="user_id"
        perPage={100}
      >
        <FunctionField render={(records: any) => {
          if (!records || records.length === 0) return "No preferences selected";
          
          return (
            <div>
              <p>User has selected {records.length} preference(s)</p>
              <p style={{ fontSize: '0.9em', color: '#666' }}>
                Categories are determined based on selected preferences
              </p>
            </div>
          );
        }} />
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled label="User ID" />
      <TextInput source="display_name" label="Display Name" />
      <TextInput source="email" type="email" />
      <DateField source="created_at" label="Joined" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="id" label="User ID (UUID)" helperText="Must match an existing auth.users ID" required />
      <TextInput source="display_name" label="Display Name" />
      <TextInput source="email" type="email" />
    </SimpleForm>
  </Create>
);
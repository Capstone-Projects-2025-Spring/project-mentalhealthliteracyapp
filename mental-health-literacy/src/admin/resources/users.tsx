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
        label="User Preferences"
        reference="userPreferences"
        target="user_id"
      >
        <Datagrid>
          <ReferenceField source="preference_id" reference="preferences">
            <TextField source="name" />
          </ReferenceField>
        </Datagrid>
      </ReferenceManyField>
      
      <ReferenceManyField
        label="User Interactions"
        reference="userInteractions"
        target="user_id"
      >
        <Datagrid>
          <ReferenceField source="videoId" reference="videos">
            <TextField source="username" />
          </ReferenceField>
          <BooleanField source="like" />
        </Datagrid>
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
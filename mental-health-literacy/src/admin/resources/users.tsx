import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  Show,
  SimpleShowLayout,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  BooleanField,
  BooleanInput,
} from 'react-admin';

export const UserList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <EmailField source="email" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
      <BooleanField source="email_confirmed_at" label="Email Confirmed" />
    </Datagrid>
  </List>
);

export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <EmailField source="email" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
      <TextField source="email_confirmed_at" />
      <TextField source="last_sign_in_at" />
    </SimpleShowLayout>
  </Show>
);

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="email" type="email" />
      <BooleanInput source="email_confirmed_at" label="Email Confirmed" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="email" type="email" required />
    </SimpleForm>
  </Create>
);
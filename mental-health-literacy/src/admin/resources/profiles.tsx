import {
  List,
  Datagrid,
  TextField,
  DateField,
  Show,
  SimpleShowLayout,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  BooleanField,
  BooleanInput,
  NumberField,
  NumberInput,
} from 'react-admin';

export const ProfileList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <NumberField source="age" />
      <BooleanField source="onboarding_complete" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

export const ProfileShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <NumberField source="age" />
      <TextField source="preferred_name" />
      <BooleanField source="onboarding_complete" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
    </SimpleShowLayout>
  </Show>
);

export const ProfileEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput source="preferred_name" />
      <NumberInput source="age" />
      <BooleanInput source="onboarding_complete" />
    </SimpleForm>
  </Edit>
);

export const ProfileCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="first_name" required />
      <TextInput source="last_name" required />
      <TextInput source="preferred_name" />
      <NumberInput source="age" />
      <BooleanInput source="onboarding_complete" defaultValue={false} />
    </SimpleForm>
  </Create>
);
import {
  List,
  Datagrid,
  TextField,
  Show,
  SimpleShowLayout,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  UrlField,
  ReferenceManyField,
  ReferenceField,
  ReferenceArrayInput,
  SelectArrayInput,
} from 'react-admin';

export const CategoryList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <UrlField source="url" />
    </Datagrid>
  </List>
);

export const CategoryShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <UrlField source="url" />
      
      <ReferenceManyField
        label="Assigned Preferences"
        reference="categoryPreferences"
        target="categoryId"
      >
        <Datagrid>
          <ReferenceField source="preferenceId" reference="preferences" label="Preference">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField source="preferenceId" reference="preferences" label="Type">
            <TextField source="type" />
          </ReferenceField>
        </Datagrid>
      </ReferenceManyField>
      
      <ReferenceManyField
        label="Videos in this Category"
        reference="videoCategories"
        target="categoryId"
        sort={{ field: 'videoId', order: 'DESC' }}
      >
        <Datagrid>
          <ReferenceField source="videoId" reference="videos" label="Video">
            <TextField source="username" />
          </ReferenceField>
          <ReferenceField source="videoId" reference="videos" label="Description">
            <TextField source="description" />
          </ReferenceField>
          <ReferenceField source="videoId" reference="videos" label="Likes">
            <TextField source="likes" />
          </ReferenceField>
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);

export const CategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <TextInput source="url" type="url" />
    </SimpleForm>
  </Edit>
);

export const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" required />
      <TextInput source="url" type="url" />
    </SimpleForm>
  </Create>
);
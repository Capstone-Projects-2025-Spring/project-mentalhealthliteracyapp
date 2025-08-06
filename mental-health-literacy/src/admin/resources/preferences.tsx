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
  Filter,
  SelectInput,
  ReferenceManyField,
  ReferenceField,
} from 'react-admin';

const PreferenceFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <SelectInput 
      label="Type" 
      source="type" 
      choices={[
        { id: 'creative', name: 'Creative' },
        { id: 'physical', name: 'Physical' },
        { id: 'social', name: 'Social' },
        { id: 'mindfulness', name: 'Mindfulness' },
        { id: 'nature', name: 'Nature' },
      ]}
    />
  </Filter>
);

export const PreferenceList = () => (
  <List filters={<PreferenceFilter />} sort={{ field: 'name', order: 'ASC' }}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="type" />
    </Datagrid>
  </List>
);

export const PreferenceShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="type" />
      
      <ReferenceManyField
        label="Categories Using This Preference"
        reference="categoryPreferences"
        target="preferenceId"
      >
        <Datagrid>
          <ReferenceField source="categoryId" reference="categories">
            <TextField source="name" />
          </ReferenceField>
        </Datagrid>
      </ReferenceManyField>
      
      <ReferenceManyField
        label="Users With This Preference"
        reference="userPreferences"
        target="preference_id"
      >
        <Datagrid>
          <ReferenceField source="user_id" reference="user">
            <TextField source="display_name" />
          </ReferenceField>
          <ReferenceField source="user_id" reference="user">
            <TextField source="email" />
          </ReferenceField>
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);

export const PreferenceEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <SelectInput 
        source="type" 
        choices={[
          { id: 'creative', name: 'Creative' },
          { id: 'physical', name: 'Physical' },
          { id: 'social', name: 'Social' },
          { id: 'mindfulness', name: 'Mindfulness' },
          { id: 'nature', name: 'Nature' },
        ]}
      />
    </SimpleForm>
  </Edit>
);

export const PreferenceCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" required />
      <SelectInput 
        source="type" 
        choices={[
          { id: 'creative', name: 'Creative' },
          { id: 'physical', name: 'Physical' },
          { id: 'social', name: 'Social' },
          { id: 'mindfulness', name: 'Mindfulness' },
          { id: 'nature', name: 'Nature' },
        ]}
      />
    </SimpleForm>
  </Create>
);
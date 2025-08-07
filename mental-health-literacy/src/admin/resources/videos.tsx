import {
  List,
  Datagrid,
  TextField,
  NumberField,
  Show,
  SimpleShowLayout,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  NumberInput,
  Filter,
  ReferenceInput,
  SelectInput,
  FunctionField,
  ReferenceManyField,
  ReferenceField,
  ReferenceArrayInput,
  SelectArrayInput,
} from 'react-admin';

const VideoFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Search Username" source="username" alwaysOn />
    <ReferenceInput source="categoryId" reference="categories" alwaysOn>
      <SelectInput optionText="name" />
    </ReferenceInput>
    <NumberInput label="Min Likes" source="likes_gte" />
  </Filter>
);

export const VideoList = () => (
  <List filters={<VideoFilter />}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="playbackId" />
      <TextField source="username" />
      <FunctionField
        label="Description"
        render={(record: any) =>
          record.description ? record.description.substring(0, 50) + '...' : ''
        }
      />
      <NumberField source="likes" />
    </Datagrid>
  </List>
);

export const VideoShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="playbackId" />
      <TextField source="username" />
      <TextField source="description" />
      <NumberField source="likes" />
      
      <ReferenceManyField
        label="Assigned Categories"
        reference="videoCategories"
        target="videoId"
        sort={{ field: 'categoryId', order: 'ASC' }}
      >
        <Datagrid>
          <ReferenceField source="categoryId" reference="categories" label="Category">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField source="categoryId" reference="categories" label="URL">
            <TextField source="url" />
          </ReferenceField>
        </Datagrid>
      </ReferenceManyField>
      
      <ReferenceManyField
        label="Users Who Liked This Video"
        reference="userInteractions"
        target="videoId"
        filter={{ like: true }}
        sort={{ field: 'user_id', order: 'DESC' }}
      >
        <Datagrid>
          <ReferenceField source="user_id" reference="user" label="User">
            <TextField source="display_name" />
          </ReferenceField>
          <ReferenceField source="user_id" reference="user" label="Email">
            <TextField source="email" />
          </ReferenceField>
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);

export const VideoEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="playbackId" />
      <TextInput source="username" />
      <TextInput source="description" multiline rows={4} />
      <NumberInput source="likes" />
    </SimpleForm>
  </Edit>
);

export const VideoCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="playbackId" required />
      <TextInput source="username" required />
      <TextInput source="description" multiline rows={4} />
      <NumberInput source="likes" defaultValue={0} />
    </SimpleForm>
  </Create>
);
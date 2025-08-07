import { Admin, Resource, Layout, useDataProvider, Loading } from 'react-admin';
import { VideoList, VideoShow, VideoEdit, VideoCreate } from './resources/videos';
import { CategoryList, CategoryShow, CategoryEdit, CategoryCreate } from './resources/categories';
import { UserList, UserShow, UserEdit, UserCreate } from './resources/users';
import { PreferenceList, PreferenceShow, PreferenceEdit, PreferenceCreate } from './resources/preferences';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Paper, 
  Button, 
  Divider,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Grid from '@mui/material/Grid'; // Grid2 for MUI v7
import { Link } from 'react-router-dom';
import {
  People as PeopleIcon,
  VideoLibrary as VideoLibraryIcon,
  Favorite as FavoriteIcon,
  TrendingUp as TrendingUpIcon,
  Category as CategoryIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const AdminLayout = (props: any) => <Layout {...props} />;

const Dashboard = () => {
  const dataProvider = useDataProvider();
  const [stats, setStats] = useState<any>({
    loading: true,
    users: 0,
    videos: 0,
    categories: 0,
    preferences: 0,
    totalLikes: 0,
    avgLikesPerVideo: 0,
    topVideos: [],
    recentUsers: [],
    userGrowth: 0,
    videoGrowth: 0,
    categoryStats: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all data
        const [users, videos, categories, preferences] = await Promise.all([
          dataProvider.getList('user', { 
            pagination: { page: 1, perPage: 1000 }, 
            sort: { field: 'created_at', order: 'DESC' }, 
            filter: {} 
          }),
          dataProvider.getList('videos', { 
            pagination: { page: 1, perPage: 1000 }, 
            sort: { field: 'likes', order: 'DESC' }, 
            filter: {} 
          }),
          dataProvider.getList('categories', { 
            pagination: { page: 1, perPage: 100 }, 
            sort: { field: 'id', order: 'ASC' }, 
            filter: {} 
          }),
          dataProvider.getList('preferences', { 
            pagination: { page: 1, perPage: 100 }, 
            sort: { field: 'id', order: 'ASC' }, 
            filter: {} 
          })
        ]);

        // Calculate statistics
        const totalLikes = videos.data.reduce((sum: number, video: any) => sum + (video.likes || 0), 0);
        const avgLikesPerVideo = videos.total && videos.total > 0 ? Math.round(totalLikes / videos.total) : 0;
        
        // Get top 5 videos
        const topVideos = videos.data.slice(0, 5);
        
        // Get recent 10 users
        const recentUsers = users.data.slice(0, 10);
        
        // Calculate growth (users from last 7 days)
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const newUsers = users.data.filter((user: any) => 
          new Date(user.created_at) > oneWeekAgo
        ).length;
        const userGrowth = users.total && users.total > 0 ? Math.round((newUsers / users.total) * 100) : 0;

        setStats({
          loading: false,
          users: users.total || 0,
          videos: videos.total || 0,
          categories: categories.total || 0,
          preferences: preferences.total || 0,
          totalLikes,
          avgLikesPerVideo,
          topVideos,
          recentUsers,
          userGrowth,
          videoGrowth: 0, // Could calculate if you track video creation dates
          categoryStats: categories.data
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setStats((prev: any) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, [dataProvider]);

  if (stats.loading) return <Loading />;

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a', marginBottom: 1 }}>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: '#666' }}>
          Mental Health Literacy Platform Overview
        </Typography>
      </Box>
      
      {/* Key Metrics Cards */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ 
            height: '100%',
            borderLeft: '4px solid #2196f3',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            '&:hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.15)' }
          }}>
            <CardContent sx={{ padding: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#666', marginBottom: 0.5 }}>
                    Total Users
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                    {stats.users.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4caf50', marginTop: 1 }}>
                    +{stats.userGrowth}% this week
                  </Typography>
                </Box>
                <PeopleIcon sx={{ color: '#2196f3', fontSize: 40, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ 
            height: '100%',
            borderLeft: '4px solid #9c27b0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            '&:hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.15)' }
          }}>
            <CardContent sx={{ padding: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#666', marginBottom: 0.5 }}>
                    Total Videos
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                    {stats.videos.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', marginTop: 1 }}>
                    Active content
                  </Typography>
                </Box>
                <VideoLibraryIcon sx={{ color: '#9c27b0', fontSize: 40, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ 
            height: '100%',
            borderLeft: '4px solid #f44336',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            '&:hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.15)' }
          }}>
            <CardContent sx={{ padding: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#666', marginBottom: 0.5 }}>
                    Total Engagement
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                    {stats.totalLikes.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', marginTop: 1 }}>
                    {stats.avgLikesPerVideo} avg/video
                  </Typography>
                </Box>
                <FavoriteIcon sx={{ color: '#f44336', fontSize: 40, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ 
            height: '100%',
            borderLeft: '4px solid #ff9800',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            '&:hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.15)' }
          }}>
            <CardContent sx={{ padding: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#666', marginBottom: 0.5 }}>
                    Categories
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                    {stats.categories}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', marginTop: 1 }}>
                    {stats.preferences} preferences
                  </Typography>
                </Box>
                <CategoryIcon sx={{ color: '#ff9800', fontSize: 40, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        {/* Top Videos Table */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper sx={{ padding: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Top Performing Videos
              </Typography>
              <Button 
                component={Link} 
                to="/admin/videos"
                size="small"
                sx={{ textTransform: 'none' }}
              >
                View All
              </Button>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Likes</TableCell>
                    <TableCell align="center">Performance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.topVideos.map((video: any, index: number) => (
                    <TableRow key={video.id} hover>
                      <TableCell>#{index + 1}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          @{video.username}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ 
                          maxWidth: 300, 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {video.description || 'No description'}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {video.likes.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ width: 80 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={Math.min((video.likes / stats.topVideos[0]?.likes) * 100, 100)} 
                            sx={{ 
                              height: 6, 
                              borderRadius: 3,
                              backgroundColor: '#e0e0e0',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: video.likes > stats.avgLikesPerVideo ? '#4caf50' : '#ff9800'
                              }
                            }}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Recent Users */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ padding: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Users
              </Typography>
              <Chip 
                label={`+${stats.userGrowth}%`} 
                size="small" 
                sx={{ 
                  backgroundColor: '#e8f5e9',
                  color: '#4caf50',
                  fontWeight: 600
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {stats.recentUsers.slice(0, 8).map((user: any) => (
                <Box 
                  key={user.id}
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 1.5,
                    borderRadius: 1,
                    backgroundColor: '#fafafa',
                    '&:hover': { backgroundColor: '#f5f5f5' }
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {user.display_name || user.email?.split('@')[0] || 'Anonymous'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    {new Date(user.created_at).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 3 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              component={Link}
              to="/admin/user"
              variant="contained"
              fullWidth
              size="large"
              startIcon={<PeopleIcon />}
              sx={{ 
                py: 2,
                textTransform: 'none',
                backgroundColor: '#2196f3',
                '&:hover': { backgroundColor: '#1976d2' }
              }}
            >
              Manage Users
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              component={Link}
              to="/admin/videos"
              variant="contained"
              fullWidth
              size="large"
              startIcon={<VideoLibraryIcon />}
              sx={{ 
                py: 2,
                textTransform: 'none',
                backgroundColor: '#9c27b0',
                '&:hover': { backgroundColor: '#7b1fa2' }
              }}
            >
              Manage Videos
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              component={Link}
              to="/admin/categories"
              variant="contained"
              fullWidth
              size="large"
              startIcon={<CategoryIcon />}
              sx={{ 
                py: 2,
                textTransform: 'none',
                backgroundColor: '#ff9800',
                '&:hover': { backgroundColor: '#f57c00' }
              }}
            >
              Manage Categories
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              component={Link}
              to="/admin/preferences"
              variant="contained"
              fullWidth
              size="large"
              startIcon={<SettingsIcon />}
              sx={{ 
                py: 2,
                textTransform: 'none',
                backgroundColor: '#4caf50',
                '&:hover': { backgroundColor: '#388e3c' }
              }}
            >
              Manage Preferences
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

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
      name="user"
      list={UserList}
      show={UserShow}
      edit={UserEdit}
      create={UserCreate}
      options={{ label: 'Users' }}
    />
    <Resource
      name="preferences"
      list={PreferenceList}
      show={PreferenceShow}
      edit={PreferenceEdit}
      create={PreferenceCreate}
      options={{ label: 'Preferences' }}
    />
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
    {/* Hidden resources for relationships */}
    <Resource name="userPreferences" />
    <Resource name="userInteractions" />
    <Resource name="categoryPreferences" />
    <Resource name="videoCategories" />
  </Admin>
);

export default AdminApp;
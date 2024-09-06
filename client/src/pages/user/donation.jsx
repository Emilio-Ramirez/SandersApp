
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const AddProject = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar la adición de un nuevo proyecto (por ejemplo, llamada a una API)
    console.log('Nuevo proyecto añadido:', { projectName, projectDescription });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add New Project
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Project Description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          required
          margin="normal"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Project
        </Button>
      </form>
    </Box>
  );
};

export default AddProject;

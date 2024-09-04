import React, { useState } from 'react';

const AddProject = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar la adición de un nuevo proyecto (por ejemplo, llamada a una API)
    console.log('Nuevo proyecto añadido:', { projectName, projectDescription });
  };

  return (
    <div>
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name:</label>
          <input 
            type="text" 
            value={projectName} 
            onChange={(e) => setProjectName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Project Description:</label>
          <textarea 
            value={projectDescription} 
            onChange={(e) => setProjectDescription(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;
